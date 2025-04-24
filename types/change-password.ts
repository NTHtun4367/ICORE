import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  token: z.string().optional().nullable(),
});
