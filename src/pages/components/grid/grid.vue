<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-grid
        :list="list"
        :col="col"
        :gap="gap + 'px'"
        :border="border"
      ></hy-grid>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">自定义列数</view>
      <hy-subsection :list="list_1" v-model="col"></hy-subsection>

      <view class="hy-title">显示边框</view>
      <hy-switch :list="list_1" v-model="border"></hy-switch>

      <view class="hy-title">边距</view>
      <hy-slider v-model="gap" :min="0" :max="20" />
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { config } from "@/config/config";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HyGrid from "@/package/components/hy-grid/hy-grid.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import HySlider from "../../../package/components/hy-slider/hy-slider.vue";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;

const list = [
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
];

const col = ref(4);
const gap = ref(0);
const border = ref(false);
const list_1 = [2, 3, 4, 5];
</script>

<style scoped lang="scss"></style>
