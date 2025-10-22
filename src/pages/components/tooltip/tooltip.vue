<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-tooltip triggerMode="click" text="复制内容"></hy-tooltip>
    </view>

    <view class="hy-title">下方显示</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容" direction="bottom"></hy-tooltip>
    </view>

    <view class="hy-title">扩展按钮</view>
    <view class="hy-container">
      <hy-tooltip
        text="复制内容"
        :buttons="['扩展', '分享']"
        trigger-mode="click"
        placement="bottom-start"
      ></hy-tooltip>
    </view>

    <view class="hy-title">高亮选中文本背景色</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容" bgColor="#e3e4e6"></hy-tooltip>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyTooltip from "@/package/components/hy-tooltip/hy-tooltip.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
</script>

<style scoped lang="scss"></style>
