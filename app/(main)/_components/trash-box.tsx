"use client";
import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
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
        <p className=" text-center">Trash Box</p>
        <div className="h-[5rem] flex items-center justify-center">
          <Spinner size="default" />
        </div>
      </>
    );
  return <p>Trash box</p>;
};

export default TrashBox;
