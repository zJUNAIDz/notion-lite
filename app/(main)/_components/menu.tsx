import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface Props {
  documentId: Id<"documents">;
}
export const Menu = ({ documentId }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const document = useQuery(api.documents.getById, { documentId });
  const remove = useMutation(api.documents.deleteNote);
  const trash = useMutation(api.documents.archieve);
  const onClick = () => {
    if (document?.isArchieved) {
      const promise = remove({ id: documentId });

      toast.promise(promise, {
        loading: "Deleting document permanently...",
        success: "Document deleted!",
        error: "Failed to delete document",
      });
      router.push("/documents");
      return;
    }
    const promise = trash({ id: documentId });

    toast.promise(promise, {
      loading: "Moving document to trash...",
      success: "Document moved to trash!",
      error: "Failed to move document to trash",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="sm" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuItem className="flex gap-x-2" onClick={onClick}>
            <Trash className="h-4 w-4" />
            {document?.isArchieved ? "Delete" : "Trash"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className=" text-xs text-muted-foreground p-2 text-left">
            Last edited by: {user?.fullName}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
