import * as z from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(100, { message: "Description is too long" }),
  deadline: z.coerce.date(),
  finished: z.boolean().optional(),
});

export type AddItemSchema = z.infer<typeof schema>;
