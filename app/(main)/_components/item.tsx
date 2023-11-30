"use_client";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  label,
  icon: Icon,
  onExpand,
  onClick,
}: ItemProps) => {
  const documentPaddingLeft = level ? level * 12 + 12 : 12;
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: `${documentPaddingLeft}px` }}
      className={cn(
        "group flex items-center space-x-1 text-sm min-h-[27px] py-1 pr-3 w-full hover:bg-primary/5 text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary    "
      )}
    >
      {!!id && (
        <div
          role="button"
          className=" h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon && (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      )}
      <div className="flex gap-1">
        <Icon className="h-[18px]" />
        <span className=" truncate">{label}</span>
      </div>

      {isSearch && (
        <kbd className=" ml-auto pointer-event-none inline-flex  h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground">
          <span className=" text-xs">CTRL</span>K
        </kbd>
      )}
    </div>
  );
};

//* Creating Skeleton sub-component as a fallback for loading documents list

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  const documentPaddingLeft = level ? level * 12 + 12 : 12;
  return (
    <div
      style={{ paddingLeft: `${documentPaddingLeft}px` }}
      className=" flex gap-x-2 py-3"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
