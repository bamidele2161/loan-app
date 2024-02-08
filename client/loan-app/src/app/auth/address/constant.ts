import * as z from "zod";

export const addressSchema = z.object({
  state: z.string().min(3, "state must be 3 or more characters"),
  lga: z.string().min(3, "lga must be 3 or more characters"),
  town: z.string().min(3, "town must be 3 or more characters"),
  dob: z.string().min(3, "dob must be 3 or more characters"),
});

export type addressType = z.infer<typeof addressSchema>;
