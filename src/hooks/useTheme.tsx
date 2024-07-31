import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { getItem, setItem } from "../services/storage";

const ThemeContext = createContext(
  {} as { theme: string; toggleTheme: () => void }
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(getItem("theme", "light"));

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      setItem("theme", newTheme);

      return newTheme;
    });
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider };
