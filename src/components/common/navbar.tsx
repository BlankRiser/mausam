import { Moon, Sun } from "@/assets/icons";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full border-b border-b-neutral-100 dark:border-b-neutral-900">
      <div className="max-w-7xl mx-auto p-1 flex items-center justify-between ">
        <Link
          to="/"
          className="px-2 text-center text-lg font-semibold text-blue-600 dark:text-blue-400 "
        >
          Mausam
        </Link>
        <div>
          <Button variant={"outline"} onClick={toggleTheme}>
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
