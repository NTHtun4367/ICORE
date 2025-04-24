"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./token";
import { sendConfirmEmail } from "./emails";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      // check email
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Please enter valid credentials!" };
      }

      if (!existingUser.emailVerified) {
        // generate verification token
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );

        // send email
        await sendConfirmEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          existingUser.name!.slice(0, 5)
        );

        return { success: "Email verification resent!" };
      }

      await signIn("credentials", { email, password, redirectTo: "/" });

      return { success: "Login successful!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Please enter valid credentials!" };
          case "OAuthSignInError":
            return { error: error.message };
        }
      }
      throw error;
    }
  });
