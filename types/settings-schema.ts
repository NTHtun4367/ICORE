import * as z from "zod";

export const settingsSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
  email: z.string().email(),
});

export const avatarSchema = z.object({
  image: z
    .string()
    .url({
      message: "Please enter a valid url.",
    })
    .optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
