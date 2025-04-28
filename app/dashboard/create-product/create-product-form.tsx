"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Tiptap from "./tiptap";
import { useAction } from "next-safe-action/hooks";
import { updateProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { execute, result, status } = useAction(updateProduct, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
        form.reset();
        router.push("/dashboard/products");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const { id, title, description, price } = values;
    execute({ title, description, price });
  };

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Create a new product</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="iphone 16" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        placeholder="Price shown in MMK"
                        {...field}
                        type="number"
                        step={100}
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "executing"}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
