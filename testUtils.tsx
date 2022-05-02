import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";

export function withTheme(component: ReactNode) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
