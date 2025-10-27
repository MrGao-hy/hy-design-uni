<template>
  <view
    v-if="hasInit"
    class="hy-transition"
    ref="u-transition"
    @tap.stop="clickHandler"
    :class="[classes, customClass]"
    :style="[mergeStyle]"
  >
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-transition",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from "vue";
import type { CSSProperties, PropType } from "vue";
import { sleep } from "../../libs";
import type { ITransitionEmits } from "./typing";

/**
 * 该组件用于组件的动画过渡效果。
 * @displayName hy-transition
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否展示组件 */
  show: {
    type: Boolean,
    default: false,
  },
  /** 使用的动画模式 */
  mode: {
    type: String,
    default: "fade",
  },
  /** 动画的执行时间，单位ms */
  duration: {
    type: Number,
    default: 300,
  },
  /** 使用的动画过渡函数 */
  timingFunction: {
    type: String,
    default: "ease-out",
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<ITransitionEmits>();

const hasInit = ref<boolean>(false); // 是否显示/隐藏组件
const viewStyle = ref<CSSProperties>({}); // 组件内部的样式
const status = ref<string>(""); // 记录组件动画的状态
const transitionEnded = ref<boolean>(false); // 组件是否结束的标记
const display = ref<boolean>(false); // 组件是否展示
const classes = ref<string>(""); // 应用的类名

// #ifndef APP-NVUE
// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
const getClassNames = (name: string) => ({
  enter: `u-${name}-enter u-${name}-enter-active`,
  "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
  leave: `u-${name}-leave u-${name}-leave-active`,
  "leave-to": `u-${name}-leave-to u-${name}-leave-active`,
});
// #endif

// #ifndef APP-NVUE
// vue版本的组件进场处理
const vueEnter = async () => {
  // 动画进入时的类名
  const classNames = getClassNames(props.mode);
  // 定义状态和发出动画进入前事件
  status.value = "enter";
  emit("beforeEnter");
  hasInit.value = true;
  display.value = true;
  classes.value = classNames.enter;
  await nextTick();
  {
    // https://github.com/umicro/uView2.0/issues/545
    await sleep(20);
    // 标识动画尚未结束
    emit("enter");
    transitionEnded.value = false;
    // 组件动画进入后触发的事件
    emit("afterEnter");
    // 赋予组件enter-to类名
    classes.value = classNames["enter-to"];
  }
};
// 动画离场处理
const vueLeave = async () => {
  // 如果不是展示状态，无需执行逻辑
  if (!display.value) return;
  const classNames = getClassNames(props.mode);
  // 标记离开状态和发出事件
  status.value = "leave";
  emit("beforeLeave");
  // 获得类名
  classes.value = classNames.leave;

  await nextTick();
  {
    // 动画正在离场的状态
    transitionEnded.value = false;
    emit("leave");
    // 组件执行动画，到了执行的执行时间后，执行一些额外处理
    setTimeout(() => onTransitionEnd(), props.duration);
    classes.value = classNames["leave-to"];
  }
};
// #endif

watch(
  () => props.show,
  (newVal) => {
    // vue和nvue分别执行不同的方法
    // #ifdef APP-NVUE
    // newVal ? nvueEnter() : nvueLeave()
    // #endif
    // #ifndef APP-NVUE
    newVal ? vueEnter() : vueLeave();
    // #endif
  },
  { immediate: true },
);

const mergeStyle = computed(() => {
  return {
    // #ifndef APP-NVUE
    transitionDuration: `${props.duration}ms`,
    // display: `${this.display ? '' : 'none'}`,
    transitionTimingFunction: props.timingFunction,
    // #endif
    // 避免自定义样式影响到动画属性，所以写在viewStyle前面
    ...props.customStyle,
    ...viewStyle,
  };
});

/**
 * @description 组件被点击发出事件
 * */
const clickHandler = () => {
  emit("click");
};

const onTransitionEnd = () => {
  // 如果已经是结束的状态，无需再处理
  if (transitionEnded.value) return;
  transitionEnded.value = true;
  // 发出组件动画执行后的事件
  status.value === "leave" ? emit("afterLeave") : emit("afterEnter");
  if (!props.show && display.value) {
    display.value = false;
    hasInit.value = false;
  }
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
// vue版本动画相关的样式抽离在外部文件
@import "./index.scss";
/* #endif */
</style>
