import { variantSchema } from "@/types/variant-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

const VariantImages = () => {
  const { control, getValues, setError } =
    useFormContext<z.infer<typeof variantSchema>>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variantImages",
  });

  return (
    <div>
      <FormField
        control={control}
        name="productType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Images</FormLabel>
            <FormDescription>
              You can upload multiple 10 images at once.
            </FormDescription>
            <FormControl>
              <UploadDropzone
                endpoint={"variantImagesUploader"}
                className="ut-allowed-content:text-primary ut-label:text-primary ut-upload-icon:text-primary/70 ut-button:bg-primary cursor-pointer"
                onBeforeUploadBegin={(files) => {
                  files.forEach((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    });
                  });
                  return files;
                }}
                onUploadError={(error) => {
                  setError("variantImages", {
                    type: "validate",
                    message: error.message,
                  });
                }}
                onClientUploadComplete={(data) => {
                  const variantImages = getValues("variantImages");
                  variantImages.forEach((img, index) => {
                    if (img.url.startsWith("blob:")) {
                      const image = data.find((i) => i.name === img.name);
                      if (image) {
                        update(index, {
                          url: image.ufsUrl,
                          name: image.name,
                          size: image.size,
                          key: image.key,
                        });
                      }
                    }
                  });
                }}
                config={{ mode: "auto" }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-wrap items-center gap-2 my-2">
        {fields.map((field, index) => (
          <div
            key={index}
            className={cn(
              "border-2 border-gray-300 rounded-md relative h-[100px] w-[100px] overflow-hidden",
              field.url.startsWith("blob:") && "animate-pulse"
            )}
          >
            <Image
              src={field.url}
              alt={field.name}
              width={70}
              height={70}
              className="object-cover w-full h-full"
            />
            <Trash
              className="w-4 h-4 absolute top-1 right-1 text-red-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                remove(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantImages;
