import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
});