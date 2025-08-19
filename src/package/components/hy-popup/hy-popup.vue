<template>
  <view :class="['hy-popup', customClass]">
    <HyOverlay
      :show="show"
      @click="overlayClick"
      v-if="overlay"
      :zIndex="zIndex"
      :duration="overlayDuration"
      :customStyle="overlayStyle"
      :opacity="overlayOpacity"
    ></HyOverlay>
    <HyTransition
      :show="show"
      :customStyle="transitionStyle"
      :mode="positionMode"
      :duration="duration"
      @afterEnter="afterEnter"
      @click="clickHandler"
    >
      <!-- @click.stop不能去除，去除会导致居中模式下点击内容区域触发关闭弹窗 -->
      <view class="hy-popup__content" :style="[contentStyle]">
        <!--        <u-status-bar v-if="safeAreaInsetTop"></u-status-bar>-->
        <slot></slot>
        <view
          v-if="closeable"
          @tap.stop="close"
          class="hy-popup__content__close"
          :class="['hy-popup__content__close--' + closeIconPos]"
          hover-class="hy-popup__content__close--hover"
          hover-stay-time="150"
        >
          <HyIcon
            :name="IconConfig.CLOSE"
            color="#909399"
            size="18"
            bold
          ></HyIcon>
        </view>
        <!--        <hy-safe-bottom v-if="safeAreaInsetBottom"></hy-safe-bottom>-->
      </view>
    </HyTransition>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-popup",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IPopupEmits } from "./typing";
import { addUnit, getWindowInfo } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyOverlay from "../hy-overlay/hy-overlay.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义。
 * @displayName hy-popup
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否展示弹窗 */
  show: {
    type: Boolean,
    default: false,
  },
  /** 是否显示遮罩 */
  overlay: {
    type: Boolean,
    default: true,
  },
  /**
   * 弹出方向
   * @values left,right,top,bottom,center
   * */
  mode: {
    type: String as PropType<HyApp.LayoutType>,
    default: "bottom",
  },
  /** 动画时长，单位ms */
  duration: {
    type: Number,
    default: 300,
  },
  /** 是否显示关闭图标 */
  closeable: {
    type: Boolean,
    default: false,
  },
  /** 自定义遮罩的样式 */
  overlayStyle: Object as PropType<CSSProperties>,
  /** 遮罩透明度，0-1之间 */
  overlayOpacity: {
    type: Number,
    default: 0.5,
  },
  /** 点击遮罩是否关闭弹窗 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 弹窗层级 */
  zIndex: {
    type: Number,
    default: 10086,
  },
  /** 是否为iPhoneX留出底部安全距离 */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  /** 是否留出顶部安全距离 */
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义关闭图标位置
   * @values top-left,top-right
   * */
  closeIconPos: {
    type: String,
    default: "top-right",
  },
  /** 圆角值 */
  round: [String, Number],
  /** 当mode=center时 是否开启缩放 */
  zoom: {
    type: Boolean,
    default: true,
  },
  /** 背景颜色 */
  bgColor: String,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IPopupEmits>();

const overlayDuration = ref(props.duration + 50);

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      // #ifdef MP-WEIXIN
      // const children = this.$children
      // retryComputedComponentRect(children)
      // #endif
    }
  },
);

const transitionStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: props.zIndex,
    position: "fixed",
    display: "flex",
  };
  if (props.mode !== "center") {
    style[props.mode] = 0;
  }
  switch (props.mode) {
    case "left":
    case "right":
      style.bottom = 0;
      style.top = 0;
      break;
    case "top":
    case "bottom":
      style.left = 0;
      style.right = 0;
      break;
    case "center":
      Object.assign(style, {
        alignItems: "center",
        "justify-content": "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
      break;
    default:
      break;
  }

  return style;
});
const contentStyle = computed(() => {
  const style: CSSProperties = {};
  // 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
  // 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
  const { safeAreaInsets } = getWindowInfo();
  if (props.mode !== "center") {
    style.flex = 1;
  }
  // 背景色，一般用于设置为transparent，去除默认的白色背景
  if (props.bgColor) {
    style.backgroundColor = props.bgColor;
  }
  if (props.round) {
    const value = addUnit(props.round);
    switch (props.mode) {
      case "top":
        style.borderBottomLeftRadius = value;
        style.borderBottomRightRadius = value;
        break;
      case "bottom":
        style.borderTopLeftRadius = value;
        style.borderTopRightRadius = value;
        break;
      case "center":
        style.borderRadius = value;
        break;
      default:
        break;
    }
  }
  return Object.assign(style, props.customStyle);
});
const positionMode = computed(() => {
  if (props.mode === "center") {
    return props.zoom ? "fade-zoom" : "fade";
  }
  if (props.mode === "left") {
    return "slide-left";
  }
  if (props.mode === "right") {
    return "slide-right";
  }
  if (props.mode === "bottom") {
    return "slide-up";
  }
  if (props.mode === "top") {
    return "slide-down";
  }
});

// 点击遮罩
const overlayClick = () => {
  if (props.closeOnClickOverlay) {
    emit("update:show", false);
    emit("close");
  }
};
const close = () => {
  emit("update:show", false);
  emit("close");
};
const afterEnter = () => {
  emit("open");
};
const clickHandler = () => {
  // 由于中部弹出时，其u-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (props.mode === "center") {
    overlayClick();
  }
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
