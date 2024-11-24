import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username cannot exceed 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
