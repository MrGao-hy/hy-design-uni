<template>
  <view
    :style="statusBarStyle"
    class="hy-status-bar"
    :class="[isH5 && 'hy-safe-area-inset-top']"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import type IProps from "./typing";
import defaultProps from "./props";
import { computed, type CSSProperties, ref } from "vue";
import { addUnit, getWindowInfo } from "../../libs";

const props = withDefaults(defineProps<IProps>(), defaultProps);

const isH5 = ref(false);

// #ifdef H5
isH5.value = true;
// #endif

const statusBarStyle = computed(() => {
  const style: CSSProperties = {};
  // 状态栏高度，由于某些安卓和微信开发工具无法识别css的顶部状态栏变量，所以使用js获取的方式
  let statusBarHeight = getWindowInfo().statusBarHeight;
  if (statusBarHeight == 0) {
    isH5.value = true;
  } else {
    style.height = addUnit(statusBarHeight, "px");
  }
  style.backgroundColor = props.bgColor;
  return Object.assign(style, props.customStyle);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
