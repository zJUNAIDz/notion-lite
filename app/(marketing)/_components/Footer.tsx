import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full p-6 bg-background dark:bg-[#1F1F1F] z-2">
      <div className="hidden md:block">
        <Logo />
      </div>

      <div className="md:ml-auto justify-between md:justify-end flex items-center w-full gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms &amp; Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
