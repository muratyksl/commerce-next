import { z } from "zod";

export const commentSchema = z.object({
  text: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment cannot exceed 500 characters"),
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5 stars"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
