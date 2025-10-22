<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-cell :list="list" @click="onClick"></hy-cell>

    <hy-transition :mode="mode" :show="show" :custom-style="style">
      <view class="transition"></view>
    </hy-transition>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, reactive, ref } from "vue";
import type { CellContentVo } from "@/package/components/hy-cell/typing";
import { getWindowInfo } from "@/package";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";

// 组件
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import HyTransition from "@/package/components/hy-transition/hy-transition.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);
const show = ref(false);
const mode = ref<HyApp.TransitionMode>("fade");
const style = computed((): CSSProperties => {
  return {
    position: "fixed",
    top: `${getWindowInfo().windowHeight / 2 - 60}px`,
    left: `${getWindowInfo().windowWidth / 2 - 60}px`,
    width: "120px",
    height: "120px",
    backgroundColor: "var(--hy-theme-color)",
  };
});

const list = reactive([
  { title: "淡入", value: "fade" },
  { title: "上滑淡入", value: "fade-up" },
  { title: "下滑淡入", value: "fade-down" },
  { title: "左滑淡入", value: "fade-left" },
  { title: "右滑淡入", value: "fade-right" },
  { title: "上滑进入", value: "slide-up" },
  { title: "下滑进入", value: "slide-down" },
  { title: "左滑进入", value: "slide-left" },
  { title: "右滑进入", value: "slide-right" },
  { title: "缩放进入", value: "zoom-in" },
  { title: "缩放退出", value: "zoom-out" },
]);

const onClick = (temp: CellContentVo) => {
  mode.value = temp.value!;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 1500);
};
</script>

<style scoped lang="scss">
.transition {
  background-color: $hy-primary;
}
</style>
