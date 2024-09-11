import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "../ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggleComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <FiSun className="h-[1.5rem] w-[1.3rem] text-yellow-400 dark:hidden" />
        <FiMoon className="hidden h-5 w-5 dark:block" />
      </Button>
    </>
  );
}
