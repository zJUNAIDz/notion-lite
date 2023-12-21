import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
interface Props {
  documentId: Id<"documents">;
  asIcon?: boolean;
  className?: string;
  size?: string;
  label?: string;
}
export const TrashButton = ({
  documentId: id,
  asIcon,
  className,
  size,
  label,
}: Props) => {
  const router = useRouter();
  const document = useQuery(api.documents.getById, { documentId: id });
  const remove = useMutation(api.documents.remove);
  const trash = useMutation(api.documents.archieve);

  const onClick = () => {
    if (document?.isArchieved) {
      const promise = remove({ id });

      toast.promise(promise, {
        loading: "Deleting document permanently...",
        success: "Document deleted!",
        error: "Failed to delete document",
      });
      router.push("/documents");
      return;
    }
    const promise = trash({ id });

    toast.promise(promise, {
      loading: "Moving document to trash...",
      success: "Document moved to trash!",
      error: "Failed to move document to trash",
    });
  };

  return (
    <>
      {asIcon ? (
        <Trash onClick={onClick} size={size} />
      ) : (
        <Button onClick={onClick} className={className}>
          <Trash size={size} />
          {label}
        </Button>
      )}
    </>
  );
};
