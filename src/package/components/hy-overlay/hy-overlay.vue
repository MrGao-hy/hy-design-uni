<template>
  <HyTransition
    :show="show"
    :custom-class="`hy-overlay ${customClass}`"
    :duration="duration"
    :custom-style="overlayStyle"
    @click="clickHandler"
  >
    <slot />
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: "hy-overlay",
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
import type { IOverlayEmits } from "./typing";
import HyTransition from "../hy-transition/hy-transition.vue";

/**
 * 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @displayName hy-overlay
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否显示遮罩 */
  show: {
    type: Boolean,
    default: false,
  },
  /** zIndex 层级 */
  zIndex: {
    type: Number,
    default: 10070,
  },
  /** 动画时长，单位毫秒 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 不透明度值，当做rgba的第四个参数 */
  opacity: {
    type: Number,
    default: 0.5,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IOverlayEmits>();

const overlayStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: props.zIndex,
    bottom: 0,
    "background-color": `rgba(0, 0, 0, ${props.opacity})`,
  };
  return Object.assign(style, props.customStyle);
});
const clickHandler = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
