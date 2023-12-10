"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

interface Props {
  initialData: Doc<"documents">;
}
const Title = ({ initialData }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const updateDocument = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const id = initialData._id;
    updateDocument({ id, title: e.target.value || "Untitled" });
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex font-extralight">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className="h-7 px-2 focus-visible:ring-transparent"
          value={title}
          onClick={enableInput}
          onChange={onChange}
          onBlur={disableInput}
          onKeyDown={onEnter}
        />
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="font-bold h-auto p-1 min-w-[100px] "
          onClick={enableInput}
        >
          <span className="truncate w-full text-left">
            {initialData?.title.toUpperCase()}
          </span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md" />;
};
