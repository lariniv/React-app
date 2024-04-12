import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  priority: z.string(),
  dueDate: z.string(),
});
