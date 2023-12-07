"use client";
import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { ImageIcon, SmilePlus, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: Props) => {
  const changeIcon = useMutation(api.documents.update);

  const inputRef = useRef<ElementRef<"textarea">>();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    //* Just in case a heckar manages to trigger this function 😅
    if (preview) return;
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      setTitle(initialData.title);
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setTitle(value);
    update({ id: initialData._id, title: value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <div className=" pl-[40px]">
      {!!initialData.icon && !preview && (
        <div className=" flex items-center gap-x-2 group/icon pt-6">
          <IconPicker
            onChange={(emoji) => {
              changeIcon({ id: initialData._id, icon: emoji });
            }}
          >
            <p className="text-3xl">
              {initialData.icon || <SmilePlus className="h-10 w-10" />}
            </p>
          </IconPicker>
          <Button
            className=" bg-transparent rounded-full opacity-0 group-hover/icon:opacity-75 transition text-muted-foreground text-xs"
            variant="outline"
          >
            <X className="h-4 w-4 " size="icon" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="md:opacity-100 group-hover/icon:opacity-75 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={() => {}} asChild>
            <Button
              className=" bg-transparent text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <SmilePlus className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={() => {}}
            className=" text-muted-foreground text-xs bg-transparent"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
