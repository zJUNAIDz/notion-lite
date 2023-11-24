"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignUpButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-xl h-full space-y-4">
      <h1 className=" text-3xl sm:text-5xl md:text-5xl font-bold">
        Your Ideas, Documents, &amp; Plans. Unified. Welcome to{" "}
        <span className="underline">Notion</span>
      </h1>
      <h3 className=" text-base sm:text-xl md:text-2xl font-medium ">
        Notion is the conected Workspace where, <br />
        Better, faster Work happens.
      </h3>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && !isAuthenticated && (
        <SignUpButton mode="modal">
          <Button>
            Get Started <ArrowRight className=" h-4 w-4 ml-2" />
          </Button>
        </SignUpButton>
      )}
      {!isLoading && isAuthenticated && (
        <Button>
          <Link href="/documents">Enter Notion</Link>
        </Button>
      )}
    </div>
  );
};

export default Heading;
