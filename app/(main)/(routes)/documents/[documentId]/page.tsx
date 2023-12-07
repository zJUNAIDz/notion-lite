"use client";
import Toolbar from "@/components/toolbar";
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
      <div className=" flex items-center justify-center w-full">
        <Spinner size="icon" />
      </div>
    );

  if (document === null) return <div>Not Found</div>;

  return (
    <div className="pb-40 ">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
