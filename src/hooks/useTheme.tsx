import { createContext, useContext, useState, useMemo, ReactNode } from "react";

const ThemeContext = createContext(
  {} as { theme: string; toggleTheme: () => void }
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
