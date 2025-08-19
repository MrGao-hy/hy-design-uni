<template>
  <view :class="['hy-line', customClass]" :style="lineStyle"></view>
</template>

<script lang="ts">
export default {
  name: "hy-line",
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
import { addUnit } from "../../utils";

/**
 * 一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单。
 * @displayName hy-line
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 线条的颜色 */
  color: String,
  /** 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 */
  length: {
    type: String,
    default: "100%",
  },
  /**
   * 线条的方向
   * @values row,column
   * */
  direction: {
    type: String,
    default: "row",
  },
  /** 是否显示细线条 */
  hairline: {
    type: Boolean,
    default: true,
  },
  /** 线条与上下左右 元素的间距，字符串形式，如"30px" */
  margin: {
    type: [String, Number],
    default: 0,
  },
  /** 是否虚线 */
  dashed: {
    type: Boolean,
    default: false,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});

const lineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.margin = props.margin;
  // 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
  if (props.direction === "row") {
    // 此处采用兼容分开写，兼容nvue的写法
    style.borderBottomWidth = "1px";
    style.borderBottomStyle = props.dashed ? "dashed" : "solid";
    style.width = addUnit(props.length);
    if (!props.hairline) style.borderBottomWidth = "1.5px";
  } else {
    // 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
    style.borderLeftWidth = "1px";
    style.borderLeftStyle = props.dashed ? "dashed" : "solid";
    style.height = addUnit(props.length);
    if (props.hairline) style.transform = "scaleX(0.5)";
  }

  style.borderColor = props.color;
  return Object.assign(style, props.customStyle);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
