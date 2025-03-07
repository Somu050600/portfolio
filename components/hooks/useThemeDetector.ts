import { useEffect, useState } from "react";

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure we are on the client

    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkTheme(getCurrentTheme());

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqListener = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);

    darkThemeMq.addEventListener("change", mqListener);
    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, []);

  return isDarkTheme;
};

export default useThemeDetector;
