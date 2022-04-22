import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import App from "./App";
import "./i18n";

// eslint-disable-next-line import/no-unresolved
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
