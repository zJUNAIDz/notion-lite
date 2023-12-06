import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import { Button } from "@/components/ui/button";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const NavBar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  // const publish = useMutation(api.documents.publish);
  const onPublish =()=>{}
  if (document === undefined) {
    return (
      <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center ">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between gap-x-4">
        <div className="flex gap-x-2">
          {isCollapsed && (
            <MenuIcon
              role="button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          )}
          <div className=" flex items-center justify-between w-full">
            <Title initialData={document} />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button onClick={onPublish} variant="outline" size="sm">
            Publish
          </Button>
          <Menu documentId={document._id} />
        </div>
      </nav>
      {document.isArchieved && <Banner documentId={document._id} />}
    </>
  );
};

export default NavBar;
