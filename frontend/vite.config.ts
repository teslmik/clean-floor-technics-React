import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "/",
    build: {
      outDir: "build",
    },
    plugins: [react()],
    server: {
      port: 3001,
      open: true,
    },
  };
});