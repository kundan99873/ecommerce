import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "https://ecommerce-backend-mu-smoky.vercel.app",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
