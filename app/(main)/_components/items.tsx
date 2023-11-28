"use_client";
import { LucideIcon } from "lucide-react";

interface Props {
  onClick: () => void;
  label: string;
  icon: LucideIcon;
}

const Item = ({ onClick, label, icon: Icon }: Props) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="group flex items-center space-x-1 text-sm min-h-[27px] py-1 pr-3 w-full hover:bg-primary/5 text-muted-foreground font-medium"
    >
      <Icon className="h-[18px]" />
      <span className=" truncate">{label}</span>
    </div>
  );
};

export default Item;
