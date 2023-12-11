"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";
interface Props {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: Props) => {
  const { documentId } = useParams();
  const id = documentId as Id<"documents">;

  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemoveCoverImage = async () => {
    //* delete it from edgestore
    if (url) await edgestore.publicFiles.delete({ url });

    //* delete it from convex database
    const promise = removeCoverImage({ id });

    toast.promise(promise, {
      loading: "Removing cover image...",
      success: "Cover image removed!",
      error: "Failed to remove cover image",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full  h-[35vh] group",
        !url && "h-[12vh]",
        url && "min-h-fit"
      )}
    >
      {!!url && (
        <Image src={url} alt="cover-image" fill className="object-contain" />
      )}
      {url && !preview && (
        <div className="z-[99999] md:opacity-0 group-hover:opacity-100 absolute  bottom-5  right-5 flex items-center gap-x-2">
          <Button
            className=" text-xs text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={() => coverImage.onReplace(url)}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={onRemoveCoverImage}
          >
            <X className="h-4 w-4" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
