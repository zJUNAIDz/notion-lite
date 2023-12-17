import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import { Menu } from "./menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import Publish from "./publish";
import Editable from "./editable";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const NavBar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const isMobile = useMediaQuery("(max-width:768px)");
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <Menu.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      {((isMobile && isCollapsed) || !isMobile) && (
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
              <Editable initialData={document} />
              <Publish initialData={document} />
              <Menu documentId={document._id} />
            </div>
          </nav>
          {document.isArchieved && <Banner documentId={document._id} />}
        </>
      )}
    </>
  );
};

export default NavBar;
