"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const tags = [
  {
    id: 1,
    name: "iPhone",
    tag: "iphone",
  },
  {
    id: 2,
    name: "iPad",
    tag: "ipad",
  },
  {
    id: 3,
    name: "MacBook",
    tag: "macbook",
  },
  {
    id: 4,
    name: "Accessories",
    tag: "accessories",
  },
  {
    id: 5,
    name: "Cover",
    tag: "cover",
  },
];

const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium my-2">
      {tags.map((t) => (
        <p
          className={cn(
            "border-2 border-primary rounded-md px-2 py-1 cursor-pointer",
            tagParams === t.tag && "bg-primary text-white"
          )}
          onClick={() => handleTagClick(t.tag)}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
};

export default TagFilter;
