import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "/",
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
