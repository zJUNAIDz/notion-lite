import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className=" hidden md:flex items-center gap-x-2">
      <Image src="/logo.svg" alt="Logo" height="40" width="40" />
      <p className={cn("font-semibold", fonts.className)}>Notion</p>
    </div>
  );
};

export default Logo;
