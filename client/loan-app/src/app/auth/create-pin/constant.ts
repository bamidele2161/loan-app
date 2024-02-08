import * as z from "zod";

export const transactionSchema = z.object({
  transactionPin: z.string().min(4, "4 digits"),
});

export type transactionType = z.infer<typeof transactionSchema>;
