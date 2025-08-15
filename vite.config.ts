import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@use "hy-app/theme.scss" as *;\n' +
          '@use "hy-app/index.scss" as *;\n',
      },
    },
  },
});
