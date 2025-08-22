import { defineConfig } from "vite";
import { resolve } from "path";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@use "@/package/libs/css/theme.scss" as *;\n' +
          '@use "hy-app/libs/css/mixin.scss" as *;\n',
      },
    },
  },
});
