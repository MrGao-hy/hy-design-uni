<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-line-progress :percentage="value"></hy-line-progress>
    </view>

    <view class="hy-title">自定义高度</view>
    <view class="hy-container">
      <hy-line-progress :percentage="value" height="20"></hy-line-progress>
    </view>

    <view class="hy-title">自定义颜色</view>
    <view class="hy-container">
      <hy-line-progress
        :percentage="value"
        activeColor="red"
      ></hy-line-progress>
    </view>

    <view class="hy-title">手动控制</view>
    <view class="hy-container" style="display: flex; margin-top: 100px">
      <button @click="computedWidth('minus')">减少</button>
      <button @click="computedWidth('plus')">增加</button>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyLineProgress from "@/package/components/hy-line-progress/hy-line-progress.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { ref } from "vue";
import { range } from "hy-app";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const value = ref(20);

const computedWidth = (type: "plus" | "minus") => {
  if (type === "plus") {
    value.value = range(0, 100, value.value + 10);
  } else {
    value.value = range(0, 100, value.value - 10);
  }
};
</script>

<style scoped lang="scss"></style>
