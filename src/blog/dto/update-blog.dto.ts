import { z } from "zod";
import { CreateBlog_validation } from "./create-blog.dto";

export const UpdateBlog_validation = CreateBlog_validation.partial();

export type UpdateBlogDto = z.infer<typeof UpdateBlog_validation>;
