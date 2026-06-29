import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from the apex domain (caffy.app) root → absolute asset paths so
// assets still load on clean deep links like /privacy and /support.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
