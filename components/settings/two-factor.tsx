"use client";

import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twoFactorSchema } from "@/types/settings-schema";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod";
import { twoFactorToggler } from "@/server/actions/settings";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

type TwoFactorProps = {
  isTwoFactorEnabled: boolean;
  email: string;
};

const TwoFactor = ({ isTwoFactorEnabled, email }: TwoFactorProps) => {
  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled,
      email,
    },
  });

  const { execute, result, status } = useAction(twoFactorToggler, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof twoFactorSchema>) => {
    const { isTwoFactorEnabled, email } = values;
    execute({ isTwoFactorEnabled, email });
  };

  useEffect(() => {
    form.setValue("isTwoFactorEnabled", isTwoFactorEnabled);
  }, [isTwoFactorEnabled, form]);

  return (
    <SettingsCard>
      {/* <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {isTwoFactorEnabled ? (
          <Button
            className="bg-green-600 text-white hover:bg-green-400"
            size={"sm"}
          >
            <Check />
            On
          </Button>
        ) : (
          <Button
            className="bg-red-600 text-white hover:bg-red-400"
            size={"sm"}
          >
            <X />
            Off
          </Button>
        )}
      </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  {isTwoFactorEnabled ? "Disabled" : "Enabled"} two factor
                  authentication for your account
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={status === "executing"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className={cn(
              "w-full mt-2",
              isTwoFactorEnabled ? "bg-red-600 hover:bg-red-400" : "bg-primary"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorEnabled ? "Disabled" : "Enabled"}
          </Button>
        </form>
      </Form>
    </SettingsCard>
  );
};

export default TwoFactor;
