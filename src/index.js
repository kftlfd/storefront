import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider as StoreProvider } from "react-redux";

import "./assets/index.scss";
import theme from "./assets/theme";
import store from "./store";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>
  // </React.StrictMode>
);
