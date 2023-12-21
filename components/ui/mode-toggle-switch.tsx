import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export const ModeToggleSwitch = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button className="border rounded-sm" size='icon' variant="ghost">
      {theme === "dark" ? (
        <Moon onClick={() => setTheme("light")} />
      ) : (
        <Sun onClick={() => setTheme("dark")} />
      )}
    </Button>
  );
};
