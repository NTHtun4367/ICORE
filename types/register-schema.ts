import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(6, {
    message: "Please enter a valid name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
