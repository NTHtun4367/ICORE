"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/server/actions/login-action";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { execute, result, status } = useAction(login, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      } else if (data?.success) {
        toast.success(data?.success);
      } else if (data?.twoFactor) {
        toast.success(data?.twoFactor);
        setIsTwoFactorOn(true);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password, code } = values;
    execute({ email, password, code });
  };

  return (
    <AuthForm
      formTitle={isTwoFactorOn ? "Place your code" : "Login to your acount"}
      showProvider
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isTwoFactorOn && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>We sent a code to your email</FormLabel>
                  <div className="flex items-center justify-center py-4">
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={status === "executing"}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormItem>
              )}
            />
          )}
          {!isTwoFactorOn && (
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="icore@gmail.com"
                        {...field}
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        {...field}
                        disabled={status === "executing"}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
                <Link href={"/auth/reset"}>Forgot password?</Link>
              </Button>
            </div>
          )}
          <Button className="w-full mb-4" disabled={status === "executing"}>
            {isTwoFactorOn ? "Verify Code" : "Login"}
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
