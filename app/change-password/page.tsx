"use client";

import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/server/actions/change-password";
import { resetPassword } from "@/server/actions/reset-password";
import { changePasswordSchema } from "@/types/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { execute, result, status } = useAction(changePassword, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    const { password } = values;
    execute({ password, token });
  };

  return (
    <AuthForm
      formTitle="Change your password"
      footerLabel="Already have an account?"
      footerHref="/auth/login"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    {...field}
                    type="password"
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={status === "executing"}>
            Change Password
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default ChangePassword;
