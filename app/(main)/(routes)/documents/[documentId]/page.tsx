"use client";
import { usePathname } from "next/navigation";

const DocumentIdPage = () => {
  const pathname = usePathname();
  const documentId = pathname.split("/")[2];
  return <div></div>;
};

export default DocumentIdPage;
