import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "vendor-react";
            }

            if (
              id.includes("@radix-ui") ||
              id.includes("lucide-react") ||
              id.includes("tailwind")
            ) {
              return "vendor-ui";
            }

            if (
              id.includes("jspdf") ||
              id.includes("html2canvas") ||
              id.includes("docx")
            ) {
              return "vendor-pdf";
            }

            return "vendor-other";
          }
        },
      },
    },
  },
});
