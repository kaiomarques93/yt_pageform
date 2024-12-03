import { CreateBlogBtn } from "@/components/CreateBlogBtn";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { FormCardSkeleton } from "../page";

export default function BlogsPage() {
  return (
    <div className="container pt-4">
    <h2 className="text-4xl font-bold col-span-2">Your blogs</h2>
    <Separator className="my-6" />
    <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateBlogBtn />
      <Suspense
        fallback={[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      >
        <div>hi</div>
      </Suspense>
    </div>
  </div>
  )
}
