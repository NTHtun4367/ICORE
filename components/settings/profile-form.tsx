import { updateDisplayName } from "@/server/actions/settings";
import { settingsSchema } from "@/types/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

type ProfileFormProps = {
  name: string;
  email: string;
  setIsOpen: () => void;
};

const ProfileForm = ({ name, email, setIsOpen }: ProfileFormProps) => {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const { execute, result, status } = useAction(updateDisplayName, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        setIsOpen();
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    const { name, email } = values;
    execute({ name, email });
  };

  return (
    <main className="px-4 lg:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="icore@admin"
                    {...field}
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={status === "executing"}>
            Save
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default ProfileForm;
