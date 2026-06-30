import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// No web font: use the system font stack (see tailwind.config). iOS renders SF Pro
// instantly — no font download, no swap reflow. Matches the fast Cloudflare build.
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
