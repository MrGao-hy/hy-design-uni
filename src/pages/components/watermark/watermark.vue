<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-setting__box">
      <hy-watermark
        :content="content"
        :image="isImage(content) ? content : ''"
        :size="size"
        :opacity="opacity"
        :rotate="rotate"
        :fullScreen="fullScreen"
        :gutter-x="space"
        :gutter-y="space"
      ></hy-watermark>
      <view class="hy-title">展示内容</view>
      <hy-subsection :list="list_1" v-model="content"></hy-subsection>

      <view class="hy-title">水印旋转角度</view>
      <hy-subsection :list="list_2" v-model="rotate"></hy-subsection>

      <view class="hy-title">是否全屏</view>
      <hy-switch v-model="fullScreen"></hy-switch>

      <view class="hy-title">边距</view>
      <hy-slider v-model="space" :min="0" :max="150" show-value />

      <view class="hy-title">字体大小</view>
      <hy-slider v-model="size" :min="12" :max="25" show-value />

      <view class="hy-title">透明度</view>
      <hy-slider
        v-model="opacity"
        :min="0"
        :max="1"
        :step="0.1"
        show-value
      ></hy-slider>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyWatermark from "@/package/components/hy-watermark/hy-watermark.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HySlider from "@/package/components/hy-slider/hy-slider.vue";
import { isImage } from "@/package";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);

const content = ref("华玥组件库");
const size = ref(12);
const space = ref(0);
const opacity = ref(0.5);
const rotate = ref(-25);
const fullScreen = ref(false);
const list_1 = [
  {
    name: "文字",
    value: "华玥组件库",
  },
  {
    name: "图片",
    value: "https://pic1.imgdb.cn/item/67f8dfea88c538a9b5caea38.png",
  },
];
const list_2 = [-45, -25, 0, 25, 45];
</script>

<style scoped lang="scss">
.hy-setting__box {
  position: relative;
}
</style>
