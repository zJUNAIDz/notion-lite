import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
const fonts = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className=" flex items-center gap-x-3">
      <Image
        src="/notion-icon.svg"
        alt="notion-icon"
        height="35"
        width="35"
        className=" dark:hidden"
      />
      <Image
        src="/notion-icon-dark.svg"
        alt="notion-icon"
        height="35"
        width="35"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", fonts.className)}>Notion Lite</p>
    </div>
  );
};

export default Logo;
