<script setup lang="ts">
import { onLaunch, onThemeChange, onUnload } from "@dcloudio/uni-app";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);

// #ifdef H5
const getMessage = (event: MessageEvent) => {
  // 判断消息是否来自可信任的源
  if (event.origin === "https://www.hy-design-uni.top") {
    darkMode.value = event.data ? "dark" : "light";
  }
};
window.addEventListener("message", getMessage);
// #endif
onUnload(() => {
  // #ifdef H5
  window.removeEventListener("message", getMessage);
  // #endif
});

onThemeChange((option) => {
  darkMode.value = option.theme;
});

onLaunch(() => {
  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.theme) {
    darkMode.value = systemInfo.theme;
  }
});
</script>
<style lang="scss">
@import "@/style/common.scss";
@import "@/package/libs/css/common.scss";
</style>
