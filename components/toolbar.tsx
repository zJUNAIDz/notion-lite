"use client";
import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { SmilePlus, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: Props) => {
  const changeIcon = useMutation(api.documents.update);

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
            className="rounded-full opacity-0 group-hover/icon:opacity-75 transition text-muted-foreground text-xs"
            variant="ghost"
          >
            <X className="h-4 w-4 " size="icon" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      aein
    </div>
  );
};

export default Toolbar;
