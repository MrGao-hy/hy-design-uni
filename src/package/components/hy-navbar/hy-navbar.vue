<template>
  <view :class="['hy-navbar', customClass]" :style="customStyle">
    <view
      class="hy-navbar__placeholder"
      v-if="fixed && placeholder"
      :style="{
        height: addUnit(getPx(height) + statusBarHeight),
      }"
    ></view>
    <view
      :class="[fixed && 'hy-navbar__fixed']"
      :style="{ backgroundColor: bgColor }"
    >
      <HyStatusBar v-if="safeAreaInsetTop" :bgColor="bgColor"></HyStatusBar>
      <view
        :class="[border && 'hy-border__bottom', 'hy-navbar__content']"
        :style="{
          height: addUnit(height),
        }"
      >
        <!-- 左边 -->
        <slot v-if="$slots.left" name="left"></slot>
        <view
          v-else
          class="hy-navbar__content__left"
          hover-class="hy-navbar__content__left--hover"
          hover-start-time="150"
          @tap="leftClick"
        >
          <HyIcon
            v-if="leftIcon"
            :name="leftIcon"
            :size="leftIconSize"
            :color="leftIconColor"
          ></HyIcon>
          <text
            v-if="leftText"
            :style="{
              color: leftIconColor,
            }"
            class="hy-navbar__content__left--text"
          >
            {{ leftText }}
          </text>
        </view>
        <!-- 左边 -->

        <!-- 中间 -->
        <slot v-if="$slots.center" name="center"></slot>
        <view v-else class="hy-navbar__content__center">
          <text
            class="hy-navbar__content__center--title"
            :style="[
              {
                width: addUnit(titleWidth),
                color: titleColor,
              },
              titleStyle,
            ]"
          >
            {{ title }}
          </text>
          <text
            class="hy-navbar__content__center--sub"
            :style="[
              {
                width: addUnit(titleWidth),
                color: titleColor,
              },
              titleStyle,
            ]"
          >
            {{ sub }}
          </text>
        </view>
        <!-- 中间 -->

        <!-- 右边 -->
        <slot v-if="$slots.right" name="right"></slot>
        <view class="hy-navbar__content__right" v-else @tap="rightClick">
          <HyIcon v-if="rightIcon" :name="rightIcon" size="20"></HyIcon>
          <text v-if="rightText" class="hy-navbar__content__right--text">{{
            rightText
          }}</text>
        </view>
        <!-- 右边 -->
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-navbar",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import type { CSSProperties, PropType } from "vue";
import type { INavbarEmits } from "./typing";
import { addUnit, getPx, getWindowInfo, IconConfig } from "../../libs";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyStatusBar from "../hy-status-bar/hy-status-bar.vue";

/**
 * 一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @displayName hy-navbar
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否开启顶部安全区适配 */
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
  /** 固定在顶部时，是否生成一个等高元素，以防止塌陷 */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /** 导航栏是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 导航栏底部是否显示下边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** 左边返回图标的名称，只能为uview-pls自带的图标 */
  leftIcon: {
    type: String,
    default: IconConfig.LEFT,
  },
  /** 左边的提示文字 */
  leftText: String,
  /** 右边的提示文字 */
  rightText: String,
  /** 右边返回图标的名称，只能为uview-plus自带的图标 */
  rightIcon: String,
  /** 导航栏标题，如设置为空字符，将会隐藏标题占位区域 */
  title: String,
  /** 导航栏副标题 */
  sub: String,
  /** 文字颜色 */
  titleColor: String,
  /** 导航栏背景设置 */
  bgColor: String,
  /** 导航栏标题的最大宽度，内容超出会以省略号隐藏 */
  titleWidth: {
    type: [String, Number],
    default: "400rpx",
  },
  /** 导航栏高度(不包括状态栏高度在内，内部自动加上) */
  height: {
    type: [String, Number],
    default: "44px",
  },
  /** 左侧返回图标的大小 */
  leftIconSize: {
    type: [String, Number],
    default: 20,
  },
  /** 左侧返回图标的颜色 */
  leftIconColor: String,
  /** 点击左侧区域(返回图标)，是否自动返回上一页（默认 false ） */
  autoBack: {
    type: Boolean,
    default: false,
  },
  /** 标题的样式，对象或字符串 */
  titleStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<INavbarEmits>();

// 获取状态栏高度
const { statusBarHeight } = getWindowInfo();

/**
 * @description 点击左侧区域
 * */
const leftClick = () => {
  // 如果配置了autoBack，自动返回上一页
  emit("leftClick");
  if (props.autoBack) {
    uni.navigateBack();
  }
};
/**
 * @description 点击右侧区域
 * */
const rightClick = () => {
  emit("rightClick");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
