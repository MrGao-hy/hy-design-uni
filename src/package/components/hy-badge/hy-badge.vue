<template>
  <text
    v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
    :class="[
      'hy-badge',
      isDot ? 'hy-badge--dot' : 'hy-badge--not-dot',
      inverted && 'hy-badge--inverted',
      shape === 'horn' && 'hy-badge--horn',
      `hy-badge--${type}${inverted ? '--inverted' : ''}`,
    ]"
    :style="[customStyle, badgeStyle]"
    @tap="onClick"
  >
    {{ isDot ? "" : showValue }}
  </text>
</template>

<script lang="ts">
export default {
  name: "hy-badge",
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
import type { IBadgeEmit } from "./typing";
import { addUnit } from "../../utils";

/**
 * 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
 * @displayName hy-badge
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 是否显示圆点 */
  isDot: {
    type: Boolean,
    default: false,
  },
  /** 显示的内容 */
  value: {
    type: Number,
    default: 0,
  },
  /** 是否显示 */
  show: {
    type: Boolean,
    default: true,
  },
  /** 最大值，超过最大值会显示 '{max}+' */
  max: {
    type: Number,
    default: 999,
  },
  /**
   * 主题类型
   * @values error,warning,success,primary,info
   * */
  type: {
    type: String,
    default: "error",
  },
  /** 当数值为 0 时，是否展示 Badge */
  showZero: {
    type: Boolean,
    default: false,
  },
  /** 背景颜色，优先级比type高，如设置，type参数会失效 */
  bgColor: String,
  /** 字体颜色 */
  color: String,
  /**
   * 徽标形状
   * @values circle,horn
   * */
  shape: {
    type: String,
    default: "circle",
  },
  /**
   * 设置数字的显示方式
   * @values overflow,ellipsis,limit
   * */
  numberType: {
    type: String,
    default: "overflow",
  },
  /**  设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效 */
  offset: Array<number>,
  /** 是否反转背景和字体颜色 */
  inverted: {
    type: Boolean,
    default: false,
  },
  /** 是否绝对定位 */
  absolute: {
    type: Boolean,
    default: false,
  },
  /** 自定义输入框外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<IBadgeEmit>();

/**
 * @description 整个组件的样式
 * */
const badgeStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.color) {
    style.color = props.color;
  }
  if (props.bgColor && !props.inverted) {
    style.backgroundColor = props.bgColor;
  }
  if (props.absolute) {
    style.position = "absolute";
    // 如果有设置offset参数
    if (props.offset && Array.isArray(props.offset)) {
      // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
      const top = props.offset[0];
      const right = props.offset[1] || top;
      style.top = addUnit(top);
      style.left = addUnit(right);
    }
  }
  return style;
});
/**
 * @description 显示值
 * */
const showValue = computed(() => {
  switch (props.numberType) {
    case "overflow":
      return Number(props.value) > Number(props.max)
        ? props.max + "+"
        : props.value;
    case "ellipsis":
      return Number(props.value) > Number(props.max) ? "..." : props.value;
    case "limit":
      return Number(props.value) > 999
        ? Number(props.value) >= 9999
          ? Math.floor((props.value / 1e4) * 100) / 100 + "w"
          : Math.floor((props.value / 1e3) * 100) / 100 + "k"
        : props.value;
    default:
      return Number(props.value);
  }
});

const onClick = (e: Event) => {
  emit("click", e);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
