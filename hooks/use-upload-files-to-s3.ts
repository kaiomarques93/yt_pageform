import slugify from "slugify";

export async function uploadFile(file: File): Promise<string> {
  const uniqueId = window.crypto.randomUUID();
  const fileName = slugify(file.name, {
    lower: true,
  });
  const applicationType = file.type;

  const finalUrl =
    process.env.NEXT_PUBLIC_SIGNED_URL_FUNCTION +
    `?id=${uniqueId}&file_name=${fileName}&content_type=${applicationType}`;

  try {
    if (!process.env.NEXT_PUBLIC_SIGNED_URL_FUNCTION) {
      throw new Error("Signed URL not defined");
    }

    // Get the signed URL for uploading
    const response = await fetch(finalUrl);

    const { uploadURL, finalUrl: s3Url } = await response.json();

    // Upload the file using the signed URL
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", applicationType);

    const uploadResponse = await fetch(uploadURL, {
      method: "PUT",
      body: file,
      headers: myHeaders,
      redirect: "follow",
    });

    if (uploadResponse.status === 200) {
      return s3Url;
    } else {
      throw new Error(`Failed to upload ${fileName}, status: ${uploadResponse.status}`);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
}

// Type guard for filtering successful uploads
function isSuccessfulUpload(result: PromiseSettledResult<string>): result is PromiseFulfilledResult<string> {
  return result.status === "fulfilled" && result.value !== "";
}

function isFailedUpload(result: PromiseSettledResult<string>): result is PromiseRejectedResult {
  return result.status === "rejected";
}

// Upload multiple files to S3
export async function uploadFilesToS3(files: File[]): Promise<string[]> {
  if (files.length === 0) {
    return [];
  }

  const uploadPromises = files.map((file) => uploadFile(file));

  const results = await Promise.allSettled(uploadPromises);

  const uploadedFiles = results.filter(isSuccessfulUpload).map((result) => result.value);

  const failedFiles = results.filter(isFailedUpload).map((result) => result.reason.message);

  if (failedFiles?.length > 0 || uploadedFiles?.length === 0) {
    throw new Error("Failed to upload:" + failedFiles.join(", "));
  }

  return uploadedFiles;
}
