"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  //* to fetch user info
  const { user } = useUser();
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty document"
        height="360"
        width="360"
        className="block dark:hidden "
      />
      <Image
        src="/empty-dark.png"
        alt="Empty document"
        height="360"
        width="360"
        className="hidden dark:block"
      />
      <h2 className=" text-xl font-medium text-muted-foreground">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button>
        <PlusCircleIcon className="h-4 w-4 mr-2"/>
        Create a Note
      </Button>
    </div>
  );
};

export default DocumentsPage;
