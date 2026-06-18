import { ModeToggle } from "@/components/mode-toggle";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import Banner from "./banner";
import Editable from "./editable";
import { Menu } from "./menu";
import Publish from "./publish";
import Title from "./title";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const NavBar = ({ isCollapsed, onResetWidth }: Props) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const params = useParams();

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
            <div className="">
              <div className="hidden md:flex items-center gap-x-2 ">
                <Editable initialData={document} />

                <Publish initialData={document} />

                <ModeToggle />
              </div>
              <Menu initialData={document} />
            </div>
          </nav>
          {document.isArchieved && <Banner documentId={document._id} />}
        </>
      )}
    </>
  );
};

export default NavBar;
