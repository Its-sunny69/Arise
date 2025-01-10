import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import StarsBackground from "./components/StarsBackground.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <StarsBackground className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"/> */}
    <div className="relative z-10">
    <App />
    </div>
  </Provider>
);
