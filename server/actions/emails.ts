"use server";

import EmailConfirmationTemplate from "@/components/email-template";
import PasswordResetEmail from "@/components/password-reset-email-template";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";

const currentBaseUrl = getBaseUrl();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmEmail = async (
  email: string,
  token: string,
  userFirstname: string
) => {
  const confirmEmailLink = `${currentBaseUrl}/confirm-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Account - Welcome to ICORE",
    react: EmailConfirmationTemplate({ userFirstname, confirmEmailLink }),
  });

  if (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetPasswordLink = `${currentBaseUrl}/change-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password - Alert from ICORE",
    react: PasswordResetEmail({ resetPasswordLink }),
  });

  if (error) {
    console.log(error);
  }
};
