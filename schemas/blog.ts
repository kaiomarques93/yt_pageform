import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(4),
  subtitle: z.string().min(4),
  description: z.string().min(10),
  author: z.string().min(4),
  date: z.string().min(4),
  image: z.string().min(4).url(),
  categories: z.array(z.enum(["ESTUDOS_DE_CASO", "NA_MIDIA", "LANCAMENTOS", "RECURSOS", "GESTAO_DIGITAL"])),
  active: z.boolean(),
  featured: z.boolean(),
});

export type blogPostSchemaType = z.infer<typeof blogPostSchema>;
