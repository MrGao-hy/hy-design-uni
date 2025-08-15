<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <hy-cell
      title="设置cell"
      :list="list"
      :arrange="arrange"
      :size="size"
      :arrowDirection="arrowDirection"
    ></hy-cell>

    <view class="hy-setting__box">
      <view class="hy-title">value定位</view>
      <hy-subsection :list="list_1" v-model="arrange"></hy-subsection>

      <view class="hy-title">单元格大小</view>
      <hy-subsection :list="list_2" v-model="size"></hy-subsection>

      <view class="hy-title">右侧icon方向</view>
      <hy-subsection :list="list_3" v-model="arrowDirection"></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { reactive, ref } from "vue";
import { IconConfig } from "hy-app";
import type { HyApp } from "hy-app/typing/modules/common";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const arrange = ref<HyApp.RowCenterType>("right");
const size = ref<HyApp.SizeType>("medium");
const arrowDirection = ref<HyApp.RotateType>("right");

const list = reactive([
  { title: "我的", icon: { name: IconConfig.MINE }, subhead: "我是小二郎" },
  {
    title: "设置",
    icon: { name: IconConfig.SETTING, color: "red" },
    value: "返回",
  },
]);

const list_1 = reactive([
  { name: "左边", value: "left" },
  { name: "中间", value: "center" },
  { name: "右边", value: "right" },
]);

const list_2 = reactive([
  { name: "大", value: "large" },
  { name: "默认", value: "medium" },
  { name: "小", value: "small" },
]);

const list_3 = reactive([
  { name: "向左", value: "left" },
  { name: "向右", value: "right" },
  { name: "向上", value: "up" },
  { name: "向下", value: "down" },
]);
</script>

<style scoped lang="scss"></style>
