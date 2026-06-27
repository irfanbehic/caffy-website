import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" keeps asset paths relative so it works on GitHub Pages
// (username.github.io/Caffy/) and from a local file preview alike.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
