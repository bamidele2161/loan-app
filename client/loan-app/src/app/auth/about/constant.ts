import * as z from "zod";

export const aboutSchema = z.object({
  phone: z.string().min(3, "phone must be 3 or more characters"),
  kinName: z.string().min(3, "kinName must be 3 or more characters"),
  occupation: z.string().min(3, "occupation must be 6 or more characters"),
  kinPhone: z.string().min(6, "kinPhone must be 6 or more characters"),
});

export type aboutType = z.infer<typeof aboutSchema>;
