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
import { getSingleProduct, updateProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CreateProductForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit_id") || null;

  const isProductExist = async (id: number) => {
    if (isEditMode) {
      const response = await getSingleProduct(id);
      if (response.error) {
        toast.error(response.error);
        router.push("/dashboard/products");
        return;
      } else if (response.success) {
        form.setValue("id", response.success.id);
        form.setValue("title", response.success.title);
        form.setValue("description", response.success.description);
        form.setValue("price", response.success.price);
      }
    }
  };
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
    execute({ id, title, description, price });
  };

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  useEffect(() => {
    if (isEditMode) {
      isProductExist(Number(isEditMode));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Product" : "Create Product"}</CardTitle>
        <CardDescription>
          {isEditMode
            ? `Edit your product: ${form.getValues("title")}`
            : "Create a new product"}
        </CardDescription>
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
              {isEditMode ? "Update Product" : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
