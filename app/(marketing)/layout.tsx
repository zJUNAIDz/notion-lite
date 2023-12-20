import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full overflow-auto">
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default MarketingLayout;
