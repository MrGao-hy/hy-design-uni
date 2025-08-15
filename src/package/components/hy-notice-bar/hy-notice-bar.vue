<template>
  <view
    class="hy-notice-bar"
    v-if="show"
    :style="[
      {
        backgroundColor: bgColor,
      },
      customStyle,
    ]"
  >
    <template v-if="direction === 'column' || (direction === 'row' && step)">
      <HyColumnNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :step="step"
        :icon="icon"
        :disable-touch="disableTouch"
        :fontSize="fontSize"
        :duration="duration"
        :justifyContent="justifyContent"
        @close="close"
        @click="click"
      ></HyColumnNotice>
    </template>
    <template v-else>
      <HyRowNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :fontSize="fontSize"
        :speed="speed"
        :url="url"
        :linkType="linkType"
        :icon="icon"
        @close="close"
        @click="click"
      ></HyRowNotice>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-notice-bar",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { PropType, CSSProperties } from "vue";
import type { INoticeBarEmits, NoticeBarModeVo } from "./typing";
import { IconConfig } from "../../config";
// 组件
import HyRowNotice from "./hy-row-notice.vue";
import HyColumnNotice from "./hy-column-notice.vue";

/**
 * 该组件用于滚动通告场景，有多种模式可供选择
 * @displayName hy-notice-bar
 */
defineOptions({});

const show = ref(true);

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 显示的内容，数组 */
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: [],
  },
  /**
   * 通告滚动模式，row-横向滚动，column-竖向滚动
   * @values row,column
   * */
  direction: {
    type: String,
    default: "row",
  },
  /** direction = row时，是否使用步进形式滚动  */
  step: {
    type: Boolean,
    default: false,
  },
  /** 是否显示左侧的音量图标 */
  icon: {
    type: String,
    default: IconConfig.NOTIFICATION_FILL,
  },
  /**
   * 通告模式，link-显示右箭头，closable-显示右侧关闭图标
   * @values link,closable
   * */
  mode: String as PropType<NoticeBarModeVo>,
  /** 文字颜色，各图标也会使用文字颜色 */
  color: String,
  /** 背景颜色 */
  bgColor: String,
  /** 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度 */
  speed: {
    type: Number,
    default: 80,
  },
  /** 字体大小，单位px */
  fontSize: {
    type: [String, Number],
    default: 14,
  },
  /** 滚动一个周期的时间长，单位ms */
  duration: {
    type: Number,
    default: 2000,
  },
  /** 是否禁止用手滑动切换 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序 */
  disableTouch: {
    type: Boolean,
    default: true,
  },
  /**
   * 分布
   * @values flex-start,flex-start,center
   * */
  justifyContent: {
    type: String,
    default: "flex-start",
  },
  /**
   * 跳转类型
   * @values navigateTo,redirectTo,switchTab,reLaunch
   * */
  linkType: {
    type: String,
    default: "navigateTo",
  },
  /** 跳转地址 */
  url: String,
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const { mode, linkType, url } = toRefs(props);
const emit = defineEmits<INoticeBarEmits>();

/**
 * @description 点击通告栏
 * */
const click = (index: number) => {
  emit("click", index);
  if (url.value && linkType.value && mode.value === "link") {
    (uni as any)[linkType.value]({ url: url.value });
  }
};
/**
 * @description 点击关闭按钮
 * */
const close = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
