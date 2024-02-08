import * as z from "zod";

export const updateSchema = z.object({
  firstName: z.string().min(3, "Password must be 3 or more characters"),
  lastName: z.string().min(3, "Password must be 3 or more characters"),
  dob: z.string().min(3, "Date of Birth must be 3 or more characters"),
  state: z.string().min(3, "State must be 3 or more characters"),
  lga: z.string().min(3, "State must be 3 or more characters"),
  email: z.string().email("Enter a valid email"),
});

export type updateType = z.infer<typeof updateSchema>;
