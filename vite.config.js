import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: repo adı "Projects" ise base "/Projects/" olmalı.
// Siteyi kullanici-adi.github.io reposuna koyarsan base: "/" yap.
export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/",
});
