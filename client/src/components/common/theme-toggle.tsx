import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });
  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div className="">
      {theme === "dark" ? (
        <div>
          <Button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            variant="ghost"
            className="dark:hover:bg-blue-lagoon-900/70 h-8 w-8 rounded-md p-0 dark:hover:text-white"
          >
            <SunMedium className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            onClick={toggleTheme}
            className="hover:bg-blue-lagoon-300/10 h-8 w-8 rounded-md p-0 dark:text-white"
          >
            <Moon className="h-5 w-5" fill="white" />
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div />
  );
}
