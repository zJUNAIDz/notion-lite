import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { ImageIcon, MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  documentId: string | string[];
  url: string;
}

export const CoverMenu = ({ documentId, url }: Props) => {
  const { edgestore } = useEdgeStore();
  const { onReplace } = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemoveCoverImage = async () => {
    await edgestore.publicFiles.delete({ url });
    const promise = removeCoverImage({ id: documentId as Id<"documents"> });
    toast.promise(promise, {
      loading: "Removing cover image...",
      success: "Cover image removed!",
      error: "Failed to remove cover image",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden absolute bottom-0 right-10">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-y-2">
          <DropdownMenuItem onClick={() => onReplace(url)}>
            <ImageIcon className="h-4 w-4 mr-2" />
            change cover
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemoveCoverImage}>
            <X className="h-4 w-4 mr-2" /> remove cover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
