import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { GitBranchIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center justify-end md:justify-between  w-full p-6 bg-background dark:bg-[#1F1F1F] z-2">
      <div className="hidden md:block">
        <Logo />
      </div>
      <Button variant="ghost" size="sm">
        <Link
          className="flex items-center gap-x-2 text-muted-foreground"
          href="https://github.com/zJUNAIDz/notion-clone"
          target="blank"
        >
          <GitBranchIcon className="h-4 w-4" /> Source code
        </Link>
      </Button>
    </div>
  );
};

export default Footer;
