<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-box">
      <hy-cell title="基础使用" :list="list" @click="onClick"></hy-cell>
    </view>

    <hy-popup
      :show="show"
      :mode="mode"
      closeable
      closeOnClickOverlay
      @close="show = false"
    >
      <view style="padding: 20px">我是弹窗</view>
    </hy-popup>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import HyPopup from "@/package/components/hy-popup/hy-popup.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { ref } from "vue";
import type { CellContentVo } from "@/package/components/hy-cell/typing";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;

const show = ref(false);
const mode = ref<HyApp.LayoutType>("center");

const list: CellContentVo[] = [
  { title: "底部弹出", value: "bottom" },
  { title: "顶部弹出", value: "top" },
  { title: "中间弹出", value: "center" },
  { title: "右侧弹出", value: "right" },
  { title: "左侧弹出", value: "left" },
];

const onClick = (temp: CellContentVo) => {
  mode.value = temp.value as HyApp.LayoutType;
  show.value = true;
};
</script>

<style scoped lang="scss"></style>
