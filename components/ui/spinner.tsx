import { Loader } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(" text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "w-4 h-4",
      sm: "w-2 h-2",
      lg: "w-6 h-6",
      icon: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
//* Syntactic sugar to change the name of VarientProps(i guess)
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

const Spinner = ({ size, className }: SpinnerProps) => {
  return <Loader className={cn(className, spinnerVariants({ size }))} />;
};

export default Spinner;
