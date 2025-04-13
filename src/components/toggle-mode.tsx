import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const ToggleMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      size="sm"
      variant="ghost"
      className="px-2"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};
