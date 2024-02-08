import * as z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(3, "Password must be 3 or more characters"),
  lastName: z.string().min(3, "Password must be 3 or more characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

export type registerType = z.infer<typeof registerSchema>;
