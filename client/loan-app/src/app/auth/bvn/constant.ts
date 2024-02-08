import * as z from "zod";

export const bvnSchema = z.object({
  bvn: z.string().min(11, "Enter a valid BVN"),
});

export type bvnType = z.infer<typeof bvnSchema>;
