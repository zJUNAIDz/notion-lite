import { ModeToggle } from "@/components/mode-toggle";
import { TrashButton } from "@/components/trash-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Editable from "./editable";
import Publish from "./publish";
import { ModeToggleSwitch } from "@/components/ui/mode-toggle-switch";
interface Props {
  initialData: Doc<"documents">;
}
export const Menu = ({ initialData }: Props) => {
  const router = useRouter();
  const documentId = initialData._id as Id<"documents">;
  const document = useQuery(api.documents.getById, { documentId });
  const remove = useMutation(api.documents.remove);
  const trash = useMutation(api.documents.archieve);
  const onClick = () => {
    if (document?.isArchieved) {
      const promise = remove({ id: initialData._id });

      toast.promise(promise, {
        loading: "Deleting document permanently...",
        success: "Document deleted!",
        error: "Failed to delete document",
      });
      router.push("/documents");
      return;
    }
    const promise = trash({ id: initialData._id });

    toast.promise(promise, {
      loading: "Moving document to trash...",
      success: "Document moved to trash!",
      error: "Failed to move document to trash",
    });
  };

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="sm" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className=" flex flex-col items-center justify-center min-w-4 shadow-none border-none"
          align="end"
          // alignOffset={8}
          forceMount
        >
          <DropdownMenuItem className="border rounded-sm" onClick={onClick}>
            {/* <Trash /> */}
            <TrashButton documentId={documentId} asIcon />
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <ModeToggle /> */}
            <ModeToggleSwitch />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Editable initialData={initialData} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Publish initialData={initialData} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
