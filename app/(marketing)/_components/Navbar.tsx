"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const isScrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-3 bg-background dark:bg-[#1F1F1F] fixed top-0 items-center flex w-full p-6",
        isScrolled && " border-b shadow-sm "
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full items-center flex gap-x-2">
        {isLoading && <p>Loading...</p>}
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
        {isAuthenticated && <p>Logged In as {user?.username}</p>}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
