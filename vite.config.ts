import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [react(), reactRefresh()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
});