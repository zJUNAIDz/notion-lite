"use client";
import { Cover } from "@/components/cover";
// import Editor from "@/components/editor";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const DocumentIdPage = () => {
  const params = useParams()
  const documentId = params.documentId as Id<"documents">;
  const userId = useUser().user?.id;
  //* Memoizing editor component
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, { documentId });
  const update = useMutation(api.documents.update);

  const isEditable = document?.userId === userId || document?.isEditable;

  const onChange = async (content: string) => {
    await update({ id: documentId, content });
  };

  if (document === undefined)
    return (
      <div>
        <Cover.Skeleton />
        <div className=" max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-8 pl-8 pt-4">
            <Skeleton className=" h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
      </div>
    );

  if (document === null) return <div>Not Found</div>;

  return (
    <div className="pb-40 ">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <Toolbar initialData={document} preview={!isEditable} />
        <Editor
          onChange={onChange}
          initialContent={document.content}
          editable={isEditable}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
