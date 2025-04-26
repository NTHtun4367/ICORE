"use server";

import EmailConfirmationTemplate from "@/components/email-template";
import PasswordResetEmail from "@/components/password-reset-email-template";
import TwoFactorCodeEmail from "@/components/two-factor-emal-template";
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

export const sendPasswordResetEmail = async (email: string, token: string) => {
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

export const sendTwoFactorEmail = async (email: string, code: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication Code - ICORE",
    react: TwoFactorCodeEmail({ twoFactorCode: code }),
  });

  if (error) {
    console.log(error);
  }
};
