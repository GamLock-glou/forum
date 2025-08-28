import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { viewport } from "@telegram-apps/sdk";

if (viewport.mount.isAvailable()) {
  viewport
    .mount()
    .then(() => {
      return viewport.requestFullscreen.ifAvailable();
    })
    .catch((error) => {
      console.warn("Failed to mount viewport:", error);
    });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
