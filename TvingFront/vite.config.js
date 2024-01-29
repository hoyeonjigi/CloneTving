import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

const __dirname = "src";
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    // 절대 경로 설정
    alias: [{ find: "@", replacement: resolve(__dirname) }],
  },
  server: {
    port: 3000,
  },
});
