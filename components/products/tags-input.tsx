import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

type TagsInputProps = {
  value: string[];
  handleOnChange: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value, handleOnChange, ...props }, ref) => {
    const [tagData, setTagData] = useState("");

    const addNewTag = () => {
      if (tagData) {
        const newTagsData = new Set([...value, tagData]);
        handleOnChange(Array.from(newTagsData));
        setTagData("");
      }
    };

    return (
      <div>
        <Input
          placeholder="Enter to save"
          value={tagData}
          {...props}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewTag();
            }
          }}
          onChange={(e) => setTagData(e.target.value)}
        />
        <div className="flex gap-1 my-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 border border-gray-300 p-1 rounded-sm text-xs font-semibold"
            >
              <span>{tag}</span>
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  handleOnChange(value.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default TagsInput;
