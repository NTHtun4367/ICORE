"use client";

import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { avatarSchema } from "@/types/settings-schema";
import { useAction } from "next-safe-action/hooks";
import { profileUpdate } from "@/server/actions/settings";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

type AvatarUploadFormProps = {
  image: string | "";
  name: string;
  email: string;
};

const AvatarUploadForm = ({ image, name, email }: AvatarUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image,
      email,
    },
  });

  const { execute, result, status } = useAction(profileUpdate, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof avatarSchema>) => {
    const { image, email } = values;
    execute({ image, email });
  };

  useEffect(() => {
    form.setValue("image", image);
  }, [image, email]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex items-center flex-col justify-center">
                <Avatar className="w-24 h-24">
                  {form.getValues("image") ? (
                    <AvatarImage
                      src={form.getValues("image")! || image!}
                      alt="profile"
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-white font-medium">
                      {name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <UploadButton
                  className="scale-75 ut-button:bg-primary ut-label:text-red-500 hover:ut-button:ring-primary ut-button:ring-primary"
                  endpoint={"imageUploader"}
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  onUploadError={(error) => {
                    form.setError("image", {
                      type: "validate",
                      message: error.message,
                    });
                    setIsUploading(false);
                    return;
                  }}
                  content={{
                    button({ ready }) {
                      if (ready) return <div>Upload Avatar</div>;
                      return <div>Uploading...</div>;
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    form.setValue("image", res[0].url!);
                    form.handleSubmit(onSubmit)();
                    setIsUploading(false);
                    return;
                  }}
                />
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default AvatarUploadForm;
