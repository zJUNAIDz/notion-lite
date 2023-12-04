import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const NavBar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return null;
  }

  return (
    <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground"
        />
      )}
      <div className=" flex items-center justify-between w-full">
        {document.title}
      </div>
    </nav>
  );
};

export default NavBar;
