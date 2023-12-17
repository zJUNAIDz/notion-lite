"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center gap-y-4">
      <Image
        src="/error.png"
        alt="not found"
        width="200"
        height="200"
        className="block dark:hidden"
      />
      <Image
        src="/error-dark.png"
        alt="not found"
        width="200"
        height="200"
        className="hidden dark:block"
      />
      <h2 className=" font-mono font-bold">Something went wrong!</h2>
      <Button variant="outline" asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
