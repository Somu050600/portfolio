"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, SunMoon } from "lucide-react";
import useThemeDetector from "./hooks/useThemeDetector";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDarkMode = useThemeDetector();
  const [mounted, setMounted] = React.useState(false);

  // Ensures component only runs on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme with system preference
  React.useEffect(() => {
    if (mounted) {
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, mounted, setTheme]);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <DropdownMenu>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <SunMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenu>
  );
}
