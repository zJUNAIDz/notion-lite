"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserItem = () => {
  const { user } = useUser();
  const Clerk = useClerk();
  const router = useRouter();

  const signOut = async () => {
    await Clerk.signOut(() => router.push("/"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="botton"
          className=" flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className=" h-10 w-10">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="w-full p-2 flex flex-col gap-y-2 mr-4 ">
          <div className=" text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</div>
          <div className=" flex gap-x-2 items-center">
            <Avatar className=" h-10 w-10">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>
            <span className=" font-medium ">{user?.fullName}&apos;s Notion</span>
          </div>
          <Button className=" flex gap-x-2" onClick={signOut} variant='ghost'>Log out <LogOut className="h-3 w-3"/></Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
