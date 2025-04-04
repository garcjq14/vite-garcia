import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// Configuração específica para o Vercel
export default defineConfig({
  base: './',
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '/src', replacement: path.resolve(__dirname, './src') },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
      { find: './src', replacement: path.resolve(__dirname, './src') },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      external: [],
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') return;
        warn(warning);
      },
    }
  }
}); 