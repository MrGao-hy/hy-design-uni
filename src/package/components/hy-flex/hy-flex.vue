<template>
  <view :class="flexClass" :style="flexStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-flex",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { PropType } from "vue";
import type { FlexAlign, FlexDirection, FlexJustify, FlexWrap } from "./typing";
import { addUnit, isArray } from "../../libs";

const props = defineProps({
  /** flex 主轴的方向是否垂直，使用 flex-direction: column */
  vertical: {
    type: Boolean,
    default: false,
  },
  /**
   * 快捷设置 flex-direction
   * @values row,row-reverse,column,column-reverse
   * */
  direction: String as PropType<FlexDirection>,
  /**
   * 设置元素在主轴方向上的对齐方式
   * @values flex-start,flex-end,space-between,space-around,space-evenly,center
   * */
  justify: {
    type: String as PropType<FlexJustify>,
    default: "flex-start",
  },
  /**
   * 设置元素在交叉轴方向上的对齐方式
   * @values flex-start,center,flex-end,stretch,baseline
   * */
  align: {
    type: String as PropType<FlexAlign>,
    default: "flex-start",
  },
  /**
   * 设置元素单行显示还是多行显示
   * @values nowrap,wrap,wrap-reverse
   * */
  wrap: {
    type: String as PropType<FlexWrap>,
    default: "nowrap",
  },
  /** flex 属性，支持数字或字符串。如 1 或 'none' */
  flex: {
    type: [String, Number],
    default: "initial",
  },
  /** 设置网格之间的间隙 */
  gap: {
    type: [String, Number, Array] as PropType<
      string | number | (string | number)[]
    >,
    default: 0,
  },
  /** 快捷设置 */
  basis: {
    type: [String, Number],
    default: "auto",
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});

// 计算 class
const flexClass = computed(() => [
  "hy-flex",
  props.customClass,
  props.vertical && "hy-flex--vertical",
]);

// 计算 style
const flexStyle = computed(() => {
  const gap = isArray(props.gap) ? props.gap : [props.gap, props.gap];
  const [rowGap, colGap] = gap.map((v) => addUnit(v));

  return {
    display: "flex",
    "justify-content": props.justify,
    "align-items": props.align,
    "flex-wrap": props.wrap,
    flex: props.flex,
    "flex-basis": props.basis,
    "row-gap": colGap,
    "column-gap": rowGap,
    ...props.customStyle,
  };
});
</script>

<style scoped></style>
