"use client";
import Spinner from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { SettingsModal } from "@/components/modals/settings-modal";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  if (!isLoading && !isAuthenticated) redirect("/");
  return (
    <div className=" h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className=" flex-1 h-full overflow-y-auto">
        <SearchCommand />
        <SettingsModal />
        {children}
      </main>
    </div>
  );
};
export default MainLayout;
