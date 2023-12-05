"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

interface Props {
  initialData: Doc<"documents">;
}
const Title = ({ initialData }: Props) => {
  const updateDocument = useMutation(api.documents.update);

  return <div>{initialData.title}</div>;
};

export default Title;
