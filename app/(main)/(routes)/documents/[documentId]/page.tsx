"use client";
import { Cover } from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
interface Props {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params: { documentId } }: Props) => {
  const document = useQuery(api.documents.getById, { documentId });

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
        <Toolbar initialData={document} preview={false} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
