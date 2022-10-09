import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import "./assets/index.scss";

import store from "./store";
import ThemeProvider from "./components/ThemeContext";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>
  // </React.StrictMode>
);
