"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
  //* to fetch user info
  const { user } = useUser();
  const router = useRouter();
  //* fetch whole document
  //* To mutate(Add) new query
  const createNote = useMutation(api.documents.create);

  const handleCreateNote = () => {
    //* return a promise and we want it as a promise (not resolved result)
    const promise = createNote({ title: "Untitiled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    //* Using Toast package here (cool stuff)
    //* can be used to manage promise as per the result
    toast.promise(promise, {
      loading: "Creating new note",
      success: "New note created",
      error: "OOPS! Failed to create new note",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty document"
        height="250"
        width="250"
        className="block dark:hidden "
      />
      <Image
        src="/empty-dark.png"
        alt="Empty document"
        height="250"
        width="250"
        className="hidden dark:block"
      />
      <h2 className=" text-xl font-medium text-muted-foreground">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={handleCreateNote}>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};

export default DocumentsPage;
