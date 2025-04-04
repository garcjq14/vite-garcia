import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// Configuração específica para o Vercel
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "/src": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    }
  }
}); 