import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

export type loginType = z.infer<typeof loginSchema>;
