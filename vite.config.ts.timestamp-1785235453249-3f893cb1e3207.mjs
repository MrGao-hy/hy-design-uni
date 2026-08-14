// vite.config.ts
import { defineConfig } from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/vite@5.4.21_@types+node@24.13.3_sass@1.102.0_terser@5.49.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import Uni from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/@uni-helper+plugin-uni@0.1._b55b711fc2a5df3e19972e00bbca2def/node_modules/@uni-helper/plugin-uni/src/index.js";
import UniPages from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/@uni-helper+vite-plugin-uni_f7c735a9ce838304f8ebbc95141941a0/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import { visualizer } from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/rollup-plugin-visualizer@6.0.11_rollup@4.62.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// src/composables/useUniPages.ts
var useUniPages = {
  exclude: ["**/components/**/**.*"],
  subPackages: ["src/pages-design"],
  homePage: "pages/index/Index",
  onBeforeWriteFile(ctx) {
    if (!ctx.subPageMetaData) return;
    ctx.subPageMetaData.forEach((item) => {
      if (item.root === "pages-design") {
        item.pages.forEach((p) => {
          if (!p.style) p.style = {};
          p.style.h5 = {
            titleNView: {
              buttons: [{ type: "share" }]
            }
          };
        });
      }
    });
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "E:\\project\\mine\\uniapp\\hy-design-uni";
var vite_config_default = defineConfig({
  plugins: [
    UniPages(useUniPages),
    Uni(),
    visualizer({
      filename: "dist/stats.html",
      // 生成报告
      gzipSize: true
      // 同时显示 gzip 体积
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2NvbXBvc2FibGVzL3VzZVVuaVBhZ2VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxtaW5lXFxcXHVuaWFwcFxcXFxoeS1kZXNpZ24tdW5pXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXG1pbmVcXFxcdW5pYXBwXFxcXGh5LWRlc2lnbi11bmlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvbWluZS91bmlhcHAvaHktZGVzaWduLXVuaS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBVbmkgZnJvbSAnQHVuaS1oZWxwZXIvcGx1Z2luLXVuaSdcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IHsgdXNlVW5pUGFnZXMgfSBmcm9tICcuL3NyYy9jb21wb3NhYmxlcy91c2VVbmlQYWdlcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBVbmlQYWdlcyh1c2VVbmlQYWdlcyksXG4gICAgICAgIFVuaSgpLFxuICAgICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZGlzdC9zdGF0cy5odG1sJywgLy8gXHU3NTFGXHU2MjEwXHU2MkE1XHU1NDRBXG4gICAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSAvLyBcdTU0MENcdTY1RjZcdTY2M0VcdTc5M0EgZ3ppcCBcdTRGNTNcdTc5RUZcbiAgICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICAgICAgc2Nzczoge1xuICAgICAgICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcbWluZVxcXFx1bmlhcHBcXFxcaHktZGVzaWduLXVuaVxcXFxzcmNcXFxcY29tcG9zYWJsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcbWluZVxcXFx1bmlhcHBcXFxcaHktZGVzaWduLXVuaVxcXFxzcmNcXFxcY29tcG9zYWJsZXNcXFxcdXNlVW5pUGFnZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvbWluZS91bmlhcHAvaHktZGVzaWduLXVuaS9zcmMvY29tcG9zYWJsZXMvdXNlVW5pUGFnZXMudHNcIjtpbXBvcnQgdHlwZSB7IFBhZ2VDb250ZXh0IH0gZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVVuaVBhZ2VzID0ge1xyXG4gICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoqLyoqLionXSxcclxuICAgIHN1YlBhY2thZ2VzOiBbJ3NyYy9wYWdlcy1kZXNpZ24nXSxcclxuICAgIGhvbWVQYWdlOiAncGFnZXMvaW5kZXgvSW5kZXgnLFxyXG4gICAgb25CZWZvcmVXcml0ZUZpbGUoY3R4OiBQYWdlQ29udGV4dCkge1xyXG4gICAgICAgIGlmICghY3R4LnN1YlBhZ2VNZXRhRGF0YSkgcmV0dXJuXHJcbiAgICAgICAgY3R4LnN1YlBhZ2VNZXRhRGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnJvb3QgPT09ICdwYWdlcy1kZXNpZ24nKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnBhZ2VzLmZvckVhY2goKHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXAuc3R5bGUpIHAuc3R5bGUgPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIHAuc3R5bGUuaDUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlTlZpZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7IHR5cGU6ICdzaGFyZScgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1MsU0FBUyxvQkFBb0I7QUFDclUsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsU0FBUyxrQkFBa0I7OztBQ0ZwQixJQUFNLGNBQWM7QUFBQSxFQUN2QixTQUFTLENBQUMsdUJBQXVCO0FBQUEsRUFDakMsYUFBYSxDQUFDLGtCQUFrQjtBQUFBLEVBQ2hDLFVBQVU7QUFBQSxFQUNWLGtCQUFrQixLQUFrQjtBQUNoQyxRQUFJLENBQUMsSUFBSSxnQkFBaUI7QUFDMUIsUUFBSSxnQkFBZ0IsUUFBUSxDQUFDLFNBQVM7QUFDbEMsVUFBSSxLQUFLLFNBQVMsZ0JBQWdCO0FBQzlCLGFBQUssTUFBTSxRQUFRLENBQUMsTUFBTTtBQUN0QixjQUFJLENBQUMsRUFBRSxNQUFPLEdBQUUsUUFBUSxDQUFDO0FBQ3pCLFlBQUUsTUFBTSxLQUFLO0FBQUEsWUFDVCxZQUFZO0FBQUEsY0FDUixTQUFTLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUFBLFlBQy9CO0FBQUEsVUFDSjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQ0o7OztBRHJCQSxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxTQUFTLFdBQVc7QUFBQSxJQUNwQixJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDUCxVQUFVO0FBQUE7QUFBQSxNQUNWLFVBQVU7QUFBQTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixLQUFLO0FBQUEsTUFDVDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
