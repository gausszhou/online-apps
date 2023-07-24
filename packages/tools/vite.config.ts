import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  build: {
    outDir: '../../dist/tools',
  },
  base: process.env.NODE_ENV === "development" ? "/" : "/apps/tools/",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  define: {
    "process.env": { ...process.env },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
}));
