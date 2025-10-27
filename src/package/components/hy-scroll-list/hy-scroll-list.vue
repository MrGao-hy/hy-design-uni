<template>
  <view class="hy-scroll-list" ref="hy-scroll-list">
    <scroll-view
      class="hy-scroll-list__scroll-view scroll-view-native"
      scroll-x
      enable-flex
      @scroll="onScroll"
      @scrolltoupper="onScrollToUpper"
      @scrolltolower="onScrollToLower"
      :data-scrollWidth="scrollWidth"
      :data-barWidth="indicatorBarWidth"
      :data-indicatorWidth="indicatorWidth"
      :show-scrollbar="false"
      :upper-threshold="0"
      :lower-threshold="0"
    >
      <slot></slot>
    </scroll-view>
    <view class="hy-scroll-list__indicator" v-if="indicator">
      <view class="hy-scroll-list__indicator--line" :style="lineStyle">
        <view
          class="hy-scroll-list__indicator--line__bar"
          :style="barStyle"
          ref="hy-scroll-list__indicator--line__bar"
        ></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-scroll-list",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, onMounted, getCurrentInstance } from "vue";
import type { CSSProperties } from "vue";
import type { IScrollListEmits } from "./typing";
import { addUnit, colorGradient, getRect, sleep } from "../../libs";

/**
 * 该组件一般用于同时展示多个商品、分类的场景，也可以完成左右滑动的列表。
 * @displayName hy-scroll-list
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 指示器的整体宽度 */
  indicatorWidth: {
    type: Number,
    default: 50,
  },
  /** 滑块的宽度 */
  indicatorBarWidth: {
    type: Number,
    default: 20,
  },
  /** 是否显示面板指示器 */
  indicator: {
    type: Boolean,
    default: true,
  },
  /** 指示器非激活颜色 */
  indicatorColor: String,
  /** 指示器的激活颜色 */
  indicatorActiveColor: String,
});
const emit = defineEmits<IScrollListEmits>();

const instance = getCurrentInstance();
const scrollWidth = ref(0);
const barLeft = ref(0);

/**
 * @description 线条样式
 * */
const barStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.transform = `translateX(${barLeft.value}px)`;
  // 设置滑块的宽度和背景色，是每个平台都需要的
  style.width = addUnit(props.indicatorBarWidth);
  style.backgroundColor = props.indicatorActiveColor;
  return style;
});
/**
 * @description 轨道样式
 * */
const lineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  // 指示器整体的样式，需要设置其宽度和背景色
  style.width = addUnit(props.indicatorWidth);
  style.backgroundColor =
    props.indicatorColor ||
    (props.indicatorActiveColor &&
      colorGradient(props.indicatorActiveColor)[90]);
  return style;
});

onMounted(() => {
  initWidth();
});

/**
 * @description 初始化宽度
 * */
const initWidth = async () => {
  // 延时一定时间，以获取dom尺寸
  await sleep(30);
  // #ifndef APP-NVUE
  getRect(".hy-scroll-list", false, instance).then((size) => {
    scrollWidth.value = (size as UniApp.NodeInfo).width!;
  });
  // #endif
};

const onScroll = (event: any) => {
  const { scrollLeft, scrollWidth: totalWidth } = event.detail;
  const targetWidth = totalWidth - scrollWidth.value;
  const targetBarWidth = props.indicatorWidth - props.indicatorBarWidth;
  barLeft.value = (scrollLeft / targetWidth) * targetBarWidth;
};

const onScrollToLower = () => {
  barLeft.value = props.indicatorWidth - props.indicatorBarWidth;
  emit("scrollRight");
};

const onScrollToUpper = () => {
  barLeft.value = 0;
  emit("scrollLeft");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
