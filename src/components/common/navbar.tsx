import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "@/assets/icons";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "../ui/button";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full border-b border-b-neutral-100 dark:border-b-neutral-900 ">
      <div className="max-w-7xl mx-auto p-1 flex items-center justify-between ">
        <Link
          to="/"
          viewTransition={{ types: ["slide-left"] }}
          className="px-2 text-center text-lg font-semibold text-blue-600 dark:text-blue-400 "
        >
          Mausam
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/networks"
            className="px-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
            activeProps={{
              className:
                "underline underline-offset-4 data-[status=active]:text-blue-600 data-[status=active]:dark:text-blue-400",
            }}
            viewTransition={{ types: ["slide-right"] }}
          >
            Networks
          </Link>
          <Link
            to="/station"
            className="px-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
            activeProps={{
              className:
                "underline underline-offset-4 data-[status=active]:text-blue-600 data-[status=active]:dark:text-blue-400",
            }}
            viewTransition={{ types: ["slide-right"] }}
          >
            Stations
          </Link>
          <Button size="icon" variant={"ghost"} onClick={toggleTheme}>
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
