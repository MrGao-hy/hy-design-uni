// vite.config.ts
import { defineConfig } from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/vite@5.4.21_@types+node@24.10.9_sass@1.78.0_terser@5.46.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import Uni from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/@uni-helper+plugin-uni@0.1._5cf595e563309f0808103947ec6fcee2/node_modules/@uni-helper/plugin-uni/src/index.js";
import UniPages from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/@uni-helper+vite-plugin-uni_4dcccfd1f8ebe31237d1ddeedb71a1c8/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import { visualizer } from "file:///E:/project/mine/uniapp/hy-design-uni/node_modules/.pnpm/rollup-plugin-visualizer@6.0.5_rollup@4.55.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

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
    Uni({
      vueOptions: {
        templateCompilerOptions: {
          isNativeTag: () => false,
          isBuiltInComponent: () => false,
          // 关键配置：强制解析字面量类型
          optimizeImports: false
        }
      }
    }),
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
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2NvbXBvc2FibGVzL3VzZVVuaVBhZ2VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxtaW5lXFxcXHVuaWFwcFxcXFxoeS1kZXNpZ24tdW5pXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXG1pbmVcXFxcdW5pYXBwXFxcXGh5LWRlc2lnbi11bmlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvbWluZS91bmlhcHAvaHktZGVzaWduLXVuaS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXHJcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCB7IHVzZVVuaVBhZ2VzIH0gZnJvbSAnLi9zcmMvY29tcG9zYWJsZXMvdXNlVW5pUGFnZXMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIFVuaVBhZ2VzKHVzZVVuaVBhZ2VzKSxcclxuICAgICAgICBVbmkoe1xyXG4gICAgICAgICAgICB2dWVPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTmF0aXZlVGFnOiAoKSA9PiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpc0J1aWx0SW5Db21wb25lbnQ6ICgpID0+IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1NTE3M1x1OTUyRVx1OTE0RFx1N0Y2RVx1RkYxQVx1NUYzQVx1NTIzNlx1ODlFM1x1Njc5MFx1NUI1N1x1OTc2Mlx1OTFDRlx1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGltaXplSW1wb3J0czogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAgICAgICBmaWxlbmFtZTogJ2Rpc3Qvc3RhdHMuaHRtbCcsIC8vIFx1NzUxRlx1NjIxMFx1NjJBNVx1NTQ0QVxyXG4gICAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSAvLyBcdTU0MENcdTY1RjZcdTY2M0VcdTc5M0EgZ3ppcCBcdTRGNTNcdTc5RUZcclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxtaW5lXFxcXHVuaWFwcFxcXFxoeS1kZXNpZ24tdW5pXFxcXHNyY1xcXFxjb21wb3NhYmxlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxtaW5lXFxcXHVuaWFwcFxcXFxoeS1kZXNpZ24tdW5pXFxcXHNyY1xcXFxjb21wb3NhYmxlc1xcXFx1c2VVbmlQYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC9taW5lL3VuaWFwcC9oeS1kZXNpZ24tdW5pL3NyYy9jb21wb3NhYmxlcy91c2VVbmlQYWdlcy50c1wiO2ltcG9ydCB0eXBlIHsgUGFnZUNvbnRleHQgfSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXHJcblxyXG5leHBvcnQgY29uc3QgdXNlVW5pUGFnZXMgPSB7XHJcbiAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKiouKiddLFxyXG4gICAgc3ViUGFja2FnZXM6IFsnc3JjL3BhZ2VzLWRlc2lnbiddLFxyXG4gICAgaG9tZVBhZ2U6ICdwYWdlcy9pbmRleC9JbmRleCcsXHJcbiAgICBvbkJlZm9yZVdyaXRlRmlsZShjdHg6IFBhZ2VDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCFjdHguc3ViUGFnZU1ldGFEYXRhKSByZXR1cm5cclxuICAgICAgICBjdHguc3ViUGFnZU1ldGFEYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ucm9vdCA9PT0gJ3BhZ2VzLWRlc2lnbicpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGFnZXMuZm9yRWFjaCgocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcC5zdHlsZSkgcC5zdHlsZSA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgcC5zdHlsZS5oNSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVOVmlldzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3sgdHlwZTogJ3NoYXJlJyB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UyxTQUFTLG9CQUFvQjtBQUNyVSxTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixTQUFTLGtCQUFrQjs7O0FDRnBCLElBQU0sY0FBYztBQUFBLEVBQ3ZCLFNBQVMsQ0FBQyx1QkFBdUI7QUFBQSxFQUNqQyxhQUFhLENBQUMsa0JBQWtCO0FBQUEsRUFDaEMsVUFBVTtBQUFBLEVBQ1Ysa0JBQWtCLEtBQWtCO0FBQ2hDLFFBQUksQ0FBQyxJQUFJLGdCQUFpQjtBQUMxQixRQUFJLGdCQUFnQixRQUFRLENBQUMsU0FBUztBQUNsQyxVQUFJLEtBQUssU0FBUyxnQkFBZ0I7QUFDOUIsYUFBSyxNQUFNLFFBQVEsQ0FBQyxNQUFNO0FBQ3RCLGNBQUksQ0FBQyxFQUFFLE1BQU8sR0FBRSxRQUFRLENBQUM7QUFDekIsWUFBRSxNQUFNLEtBQUs7QUFBQSxZQUNULFlBQVk7QUFBQSxjQUNSLFNBQVMsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQUEsWUFDL0I7QUFBQSxVQUNKO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDSjs7O0FEckJBLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFNBQVMsV0FBVztBQUFBLElBQ3BCLElBQUk7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNSLHlCQUF5QjtBQUFBLFVBQ3JCLGFBQWEsTUFBTTtBQUFBLFVBQ25CLG9CQUFvQixNQUFNO0FBQUE7QUFBQSxVQUUxQixpQkFBaUI7QUFBQSxRQUNyQjtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNQLFVBQVU7QUFBQTtBQUFBLE1BQ1YsVUFBVTtBQUFBO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNqQztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
