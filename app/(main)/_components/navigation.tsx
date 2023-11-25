import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon } from "lucide-react";
import { ElementRef, MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts"; //* can be done using tailwind but would be complicated, as it is resizable component
export const Navigation = () => {
  //*Responsive media query
  const isMobile = useMediaQuery("(max-width:768px)");
  //* refernces to Dom elements
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isresetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile); //* Collapsed by default in mobile devices

  //* handling resizing navbar actions
  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault(); //* oh man why
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    //* prevent this component width to go off limits
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          " group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]",
          isresetting && " transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className=" h-6 w-6" />
        </div>
        <div>
          <p>Action Items</p>
        </div>
        <div className=" mt-4">
          <p>Documents</p>
        </div>
        {/* grouping this hidden div with sidebar.. appears when hover on sidebar */}
        <div
          onMouseDown={handleMouseDown}
          onClick={() => {}}
          className=" bg-[#c0c0c0] opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-2 h-full bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          " absolute top-0 z-[99999] left-60 w-[calc(100% - 240px)]",
          isresetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className=" bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
};
