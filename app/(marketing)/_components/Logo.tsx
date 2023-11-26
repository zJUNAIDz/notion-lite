import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className=" hidden md:flex items-center">
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
        className="hidden filter invert-1 dark:block"
      />
      <p className={cn("font-semibold", fonts.className)}>Notion</p>
    </div>
  );
};

export default Logo;
