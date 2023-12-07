"use client";
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  initialData: Doc<"documents">;
}

const Toolbar = ({ initialData }: Props) => {
  return <div>Toolbar</div>;
};

export default Toolbar;
