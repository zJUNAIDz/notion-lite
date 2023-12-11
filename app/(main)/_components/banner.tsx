import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
interface Props {
  documentId: Id<"documents">;
}
const Banner = ({ documentId: id }: Props) => {
  const router = useRouter();
  const restore = useMutation(api.documents.unArchieve);
  const remove = useMutation(api.documents.remove);
  const onRestore = () => {
    const promise = restore({ id });

    toast.promise(promise, {
      loading: "Restoring the document...",
      success: "Document restored!",
      error: "Failed to restore document :(",
    });
  };

  const onRemove = () => {
    const promise = remove({ id });
    toast.promise(promise, {
      loading: "Deleting Document...",
      success: "Document deleted!",
      error: "Failed to delete document",
    });
    router.push("/documents");
  };

  return (
    <div className="w-full bg-red-500 flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2 py-1 text-white">
      <p className="hidden md:block ">This page is in the Trash</p>
      <div className="flex gap-x-2">
        <Button
          size="sm"
          onClick={onRestore}
          variant="outline"
          className=" bg-transparent hover:text-white hover:bg-red-400 border-white"
        >
          Restore page
        </Button>

        <ConfirmModal
          btnColor="bg-red-500 hover:bg-red-700"
          onConfirm={onRemove}
        >
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent hover:text-white hover:bg-red-400 border-white"
          >
            Delete Forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Banner;
