"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuLabel asChild>
        <div
          role="botton"
          className=" flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className=" h-5 w-5">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>
            <span>{user?.firstName}&apos;s Notion</span>
          </div>
        </div>
      </DropdownMenuLabel>
    </DropdownMenu>
  );
};
