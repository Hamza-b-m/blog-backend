import { z } from "zod";

export const CreateBlog_validation = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, "Title cannot be empty"),
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(1, "Content cannot be empty"),
  author: z
    .string({ required_error: "Author is required" })
    .trim()
    .min(1, "Author cannot be empty"),
});

export type CreateBlogDto = z.infer<typeof CreateBlog_validation>;
