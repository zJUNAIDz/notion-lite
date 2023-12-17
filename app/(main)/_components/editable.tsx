import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/hover-card";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { useMutation } from "convex/react";
import { FileEdit, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
interface Props {
  initialData: Doc<"documents">;
}
const Editable = ({ initialData }: Props) => {
  const update = useMutation(api.documents.update);
  const [isEditable, setIsEditable] = useState(initialData.isEditable);
  const toggleIsEditable = () => {
    const promise = update({ id: initialData._id, isEditable: !isEditable });
    toast.promise(promise, {
      loading: isEditable
        ? "resetting to not editable"
        : "setting to editable...",
      success: isEditable
        ? "Document is not editable now"
        : "Document is now editable!",
      error: isEditable
        ? "Failed to reset to not editable"
        : "Failed to set to editable",
    });
    setIsEditable((prev) => !prev);
  };
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div onClick={toggleIsEditable}>
          {initialData.isEditable ? (
            <Button variant="ghost" className="group">
              <FileEdit className="md:group-hover:hidden" />
              <Lock className="hidden md:group-hover:block" />
            </Button>
          ) : (
            <Button variant="ghost" className="group">
              <Lock className="md:group-hover:hidden" />
              <FileEdit className="hidden md:group-hover:block" />
            </Button>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="md:hidden" align="end">
        <div className=" px-2 py-1 mt-2 border rounded-sm text-xs text-muted-foreground">
          {initialData.isEditable
            ? "Click to make it editable"
            : "Click to make it non-editable"}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default Editable;
