"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const Navbar = () => {
  const isScrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-3 bg-background fixed top-0 items-center flex w-full p-6",
        isScrolled && " border-b shadow-sm "
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full items-center flex gap-x-2">
        Login
      </div>
    </div>
  );
};

export default Navbar;
