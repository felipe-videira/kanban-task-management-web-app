import "./main.css";

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import App from "./App";
import "./i18n";
import { BrowserRouter } from "react-router-dom";

// eslint-disable-next-line import/no-unresolved
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
