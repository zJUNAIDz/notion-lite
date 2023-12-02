"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getArchieved);
  const restoreNote = useMutation(api.documents.unArchieve);
  const deleteNote = useMutation(api.documents.deleteNote);
  const [search, setSearch] = useState("");

  const filteredDocument = documents?.filter((document) =>
    document.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restoreNote({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  const onDelete = (documentId: Id<"documents">) => {
    const promise = deleteNote({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note 😥",
    });
    //* to get back to avoid 404 page
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined)
    return (
      <>
        <div className="h-[5rem] flex items-center justify-center">
          <Spinner size="default" />
        </div>
      </>
    );
  return (
    <div className=" text-sm">
      <div className=" flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div className="  mt-2 px-1 pb-1">
        <p className="hidden last:block text-center text-muted-foreground pb-2">
          No Documents found!
        </p>
        {filteredDocument?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className=" text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between "
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className=" flex items-center">
              <div
                role="button"
                onClick={(e) => onRestore(e, document._id)}
                className=" rounded-sm p-2 hover:bg-neutral-200 "
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onDelete(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
