"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const isScrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-[3] bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center  w-full p-6 justify-between",
        isScrolled && " border-b shadow-sm "
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between  items-center flex gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get Notion Free</Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button className=" hidden md:block">
              <Link href="/documents">Enter Notion</Link>
            </Button>
          </>
        )}
        <div className=" flex space-x-3 items-center">
          {isAuthenticated && !isLoading && <UserButton />}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
