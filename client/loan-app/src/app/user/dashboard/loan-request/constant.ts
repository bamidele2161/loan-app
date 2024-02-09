import * as z from "zod";

export const updateSchema = z.object({
  amount: z.string().min(3, "amount must be 3 or more characters"),
  firstguarantor: z.string().min(3, "min of 3"),
  guarantoremail: z.string().email("Valid email"),
  secguarantor: z.string().min(3, "State must be 3 or more characters"),
  secguarantoremail: z.string().email("Valid email"),
  duration: z.string().min(1, "Enter a valid duration"),
  bankname: z.string().min(3, "Bank name must be at least 3 characters"),
  accountname: z.string().min(3, "Account name must be at least 3 characters"),
  accountno: z.string().min(3, "Account number must be at least 3 characters"),
});

export type updateType = z.infer<typeof updateSchema>;
