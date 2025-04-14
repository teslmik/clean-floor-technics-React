import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/",
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
        "@cms": path.resolve(__dirname, "cms"),
      },
    },
    build: {
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const pkgName = id.split("node_modules/")[1].split("/")[0];
              return `vendor-${pkgName}`;
            }
            if (id.includes("src/pages")) {
              return id.split("src/pages/")[1].split("/")[0];
            }
            return "main";
          },
        },
      },
    },
    plugins: [react()],
    server: {
      port: 3001,
      open: true,
    },
  };
});
