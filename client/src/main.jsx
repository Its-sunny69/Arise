import { createRoot } from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

const root = document.getElementById("root");

const renderApp = () => {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderApp, { once: true });
} else {
  renderApp();
}
