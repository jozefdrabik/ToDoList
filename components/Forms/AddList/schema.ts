import * as z from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type AddListSchema = z.infer<typeof schema>;
