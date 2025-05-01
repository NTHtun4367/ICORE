"use client";

import { VariantsWithImagesTags } from "@/lib/infer-type";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { variantSchema } from "@/types/variant-schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
import TagsInput from "./tags-input";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hooks";
import { createVariant } from "@/server/actions/variants";
import { toast } from "sonner";

type VariantDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
};

const VariantDialog = ({
  children,
  editMode,
  productID,
  variant,
}: VariantDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      productID,
      color: "#000000",
      tags: [],
      variantImages: [],
      id: undefined,
      productType: "Black",
      editMode,
    },
  });

  const { execute, result, status } = useAction(createVariant, {
    onSuccess({ data }) {
      form.reset();
      setOpen(false);
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof variantSchema>) => {
    const { color, editMode, productID, productType, tags, variantImages, id } =
      values;
    execute({
      color,
      editMode,
      productID,
      productType,
      tags,
      variantImages,
      id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update an existing" : "Create new"} product's variant
          </DialogTitle>
          <DialogDescription>Manage your product variants.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your variant's title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      {...field}
                      handleOnChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "executing"}
            >
              {editMode ? "Update" : "Create"} product's variant
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;
