"use client";

import { VariantsWithImagesTags } from "@/lib/infer-type";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import placeHolderImage from "@/public/placeholder.jpg";

type ImageSliderProps = {
  variants: VariantsWithImagesTags[];
};

const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);
  const searchParams = useSearchParams();
  const currentVariantType = searchParams.get("type");

  const updateSlider = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) return;

    api.on("slidesInView", (e) => {
      setActiveIndex(e.slidesInView());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img) => (
              <CarouselItem key={img.image_url}>
                {img.image_url && (
                  <Image
                    src={img.image_url}
                    alt={img.name}
                    width={1100}
                    height={600}
                    priority
                  />
                )}
              </CarouselItem>
            ))
        )}
      </CarouselContent>
      <div className="flex items-center gap-4 py-2">
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img, index) => (
              <div key={img.image_url}>
                {img.image_url && (
                  <Image
                    className={cn(
                      "border-2 border-slate-200 rounded-md cursor-pointer transition-all",
                      index === activeIndex[0]
                        ? "opacity-100 border-slate-400"
                        : "opacity-50"
                    )}
                    src={img.image_url}
                    alt={img.name}
                    width={75}
                    height={45}
                    priority
                    onClick={() => updateSlider(index)}
                  />
                )}
              </div>
            ))
        )}
      </div>
    </Carousel>
  );
};

export default ImageSlider;
