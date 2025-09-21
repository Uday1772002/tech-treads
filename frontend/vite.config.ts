import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      "@/shared": path.resolve(__dirname, "../shared"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: ["zod", "hono"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
