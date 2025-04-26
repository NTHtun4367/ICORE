"use client";

import { KeyRound } from "lucide-react";
import SettingsCard from "./settings-card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { useAction } from "next-safe-action/hooks";
import { resetPassword } from "@/server/actions/reset-password";
import { toast } from "sonner";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

type ChangePasswordProps = {
  email: string;
};

const ChangePassword = ({ email }: ChangePasswordProps) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ? email : "",
    },
  });

  const { execute, result, status } = useAction(resetPassword, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const { email } = values;
    execute({ email });
  };

  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Change Password</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button disabled={status === "executing"}>
              <KeyRound className="w-5 h-5" />
            </Button>
          </form>
        </Form>
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
