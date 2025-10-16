<template>
  <view class="hy-card" @tap.stop="click" :class="cardClass" :style="cardStyle">
    <view
      v-if="showHead"
      class="hy-card--head"
      :style="[{ padding: addUnit(paddingHead || padding) }, headStyle]"
      :class="{
        'hy-border__bottom': headBorderBottom,
      }"
      @tap="headClick"
    >
      <view v-if="!$slots.header" class="hy-card--head__flex">
        <view class="hy-card--head__left" v-if="title">
          <image
            :src="thumb"
            class="hy-card--head__left__thumb"
            mode="aspectFill"
            v-if="thumb"
            :style="{
              height: addUnit(thumbWidth),
              width: addUnit(thumbWidth),
              borderRadius: thumbCircle ? '50px' : '4px',
            }"
          ></image>
          <text
            class="hy-card--head__left__title"
            :style="{
              fontSize: addUnit(titleSize),
              color: titleColor,
            }"
          >
            {{ title }}
          </text>
        </view>
        <view class="hy-card--head__right hy-line-1" v-if="subTitle">
          <text
            class="hy-card--head__title__text"
            :style="{
              fontSize: addUnit(subTitleSize),
              color: subTitleColor,
            }"
          >
            {{ subTitle }}
          </text>
        </view>
      </view>
      <!-- @slot 头部插槽 -->
      <slot name="header" v-else />
    </view>
    <view
      @tap="bodyClick"
      class="hy-card__body"
      :style="[{ padding: addUnit(paddingBody || padding) }, bodyStyle]"
    >
      <!-- @slot 中间内容插槽 -->
      <slot name="body" />
    </view>
    <view
      v-if="showFoot"
      class="hy-card__foot"
      @tap="footClick"
      :style="[
        { padding: $slots.footer ? addUnit(paddingFoot || padding) : 0 },
        footStyle,
      ]"
      :class="{
        'hy-border__top': footBorderTop,
      }"
    >
      <!-- @slot 底部插槽 -->
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-card",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { ICardEmits } from "./typing";
import { addUnit, getPx } from "../../utils";

/**
 * 卡片组件一般用于多个列表条目，且风格统一的场景。
 * @displayName hy-card
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 卡片与屏幕两侧是否留空隙 */
  full: {
    type: Boolean,
    default: false,
  },
  /** 头部左边的标题 */
  title: String,
  /** 标题颜色 */
  titleColor: String,
  /** 标题字体大小，单位rpx */
  titleSize: {
    type: String,
    default: "18px",
  },
  /** 头部右边的副标题 */
  subTitle: String,
  /** 副标题颜色 */
  subTitleColor: {
    type: String,
    default: "#909399",
  },
  /** 副标题字体大小 */
  subTitleSize: {
    type: [String, Number],
    default: 13,
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** 用于标识点击了第几个卡片 */
  index: [String, Number],
  /** 卡片与屏幕两边和上下元素的间距，需带单位，如"30px 20px" */
  margin: {
    type: String,
    default: "0 0 20rpx",
  },
  /** 卡片整体的圆角值，单位px */
  borderRadius: {
    type: [String, Number],
    default: 8,
  },
  /** 是否显示头部的下边框 */
  headBorderBottom: {
    type: Boolean,
    default: false,
  },
  /** 是否显示底部的上边框 */
  footBorderTop: {
    type: Boolean,
    default: false,
  },
  /** 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径 */
  thumb: String,
  /** 缩略图的宽度，高等于宽，单位px */
  thumbWidth: {
    type: [String, Number],
    default: 30,
  },
  /** 缩略图是否为圆形 */
  thumbCircle: {
    type: Boolean,
    default: false,
  },
  /** 给head，body，foot的内边距 */
  padding: {
    type: [String, Number],
    default: 15,
  },
  /** 头部内边距 */
  paddingHead: [String, Number],
  /** 中部内边距 */
  paddingBody: [String, Number],
  /** 尾部内边距 */
  paddingFoot: [String, Number],
  /** 是否显示头部 */
  showHead: {
    type: Boolean,
    default: true,
  },
  /** 是否显示尾部 */
  showFoot: {
    type: Boolean,
    default: true,
  },
  /** 卡片外围阴影，字符串形式 */
  boxShadow: {
    type: [Boolean, String],
    default: true,
  },
  /** 头部自定义样式，对象形式 */
  headStyle: Object as unknown as PropType<CSSProperties>,
  /** 中部自定义样式 */
  bodyStyle: Object as unknown as PropType<CSSProperties>,
  /** 底部自定义样式 */
  footStyle: Object as unknown as PropType<CSSProperties>,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
});
const emit = defineEmits<ICardEmits>();

const cardClass = computed(() => {
  const hasBorder = getPx(props.borderRadius) > 0;
  return [
    props.border && "hy-border",
    props.full && "hy-card--full",
    hasBorder && "hy-card--border",
  ].filter(Boolean);
});
const cardStyle = computed(() => {
  return Object.assign(
    {
      borderRadius: addUnit(props.borderRadius),
      margin: props.margin,
      boxShadow: props.boxShadow
        ? typeof props.boxShadow === "boolean"
          ? "0 0 10rpx 4rpx rgba(0, 0, 0, 0.16)"
          : props.boxShadow
        : "",
    },
    props.customStyle,
  );
});

const click = () => {
  emit("click", props.index);
};
/**
 * @description 点击头部
 * */
const headClick = () => {
  emit("head-click", props.index);
};
/**
 * @description 点击身体
 * */
const bodyClick = () => {
  emit("body-click", props.index);
};
/**
 * @description 点击尾部
 * */
const footClick = () => {
  emit("foot-click", props.index);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
