import { createRoot } from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const loadDeferredFonts = () => import("./deferred-fonts.css");

const root = document.getElementById("root");

const renderApp = () => {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
};

const scheduleDeferredFonts = () => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(loadDeferredFonts, { timeout: 2000 });
    return;
  }

  window.setTimeout(loadDeferredFonts, 0);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderApp, { once: true });
} else {
  renderApp();
}

if (document.readyState === "complete") {
  scheduleDeferredFonts();
} else {
  window.addEventListener("load", scheduleDeferredFonts, { once: true });
}