<template>
  <view
    :class="['hy-tooltip', customClass]"
    :style="customStyle"
    @click.stop="closeHandler"
  >
    <HyOverlay
      :show="showTooltip && tooltipTop !== -10000 && overlay"
      :customStyle="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
      @click="closeHandler"
    ></HyOverlay>
    <!-- 文本内容区域 -->
    <view
      class="hy-tooltip__content"
      id="target"
      @longpress.stop="longPressHandler"
      @tap.stop="clickHandler"
      :style="{
        color: color,
        backgroundColor:
          bgColor && showTooltip && tooltipTop !== -10000
            ? bgColor
            : 'transparent',
      }"
    >
      <slot v-if="$slots.default"></slot>
      <text class="hy-tooltip__content--text" v-else>{{ text }}</text>
    </view>

    <!-- 用于获取弹窗宽高 -->
    <view class="hy-tooltip__popup hy-tooltip__hidden" id="pos">
      <view class="hy-tooltip__container custom-pop">
        <view class="hy-tooltip__container--list">
          <view
            v-if="showCopy"
            class="hy-tooltip__container--list__btn"
            hover-class="hy-tooltip__container--list__btn--hover"
            @tap="setClipboardData"
          >
            <text class="hy-tooltip__container--list__btn--text">复制</text>
          </view>
          <HyLine
            direction="column"
            color="#8d8e90"
            v-if="showCopy && buttons.length > 0"
            length="18"
          ></HyLine>
          <template v-for="(item, index) in buttons" :key="index">
            <view
              class="hy-tooltip__container--list__btn"
              hover-class="hy-tooltip__container--list__btn--hover"
            >
              <text
                class="hy-tooltip__container--list__btn--text"
                @tap="btnClickHandler(index)"
              >
                {{ item }}
              </text>
            </view>
            <HyLine
              direction="column"
              color="#8d8e90"
              v-if="index < buttons.length - 1"
              length="18"
            ></HyLine>
          </template>
        </view>
      </view>
    </view>

    <HyTransition
      mode="fade"
      :show="showTooltip"
      :duration="300"
      custom-class="hy-tooltip__popup"
      :custom-style="popover.popStyle.value"
    >
      <view class="hy-tooltip__container">
        <!-- 三角形 -->
        <view
          v-if="showCopy"
          :class="`hy-tooltip__arrow ${popover.arrowClass.value}`"
          :style="popover.arrowStyle.value"
        ></view>
        <!-- 三角形 -->

        <view class="hy-tooltip__container--list">
          <view
            v-if="showCopy"
            class="hy-tooltip__container--list__btn"
            hover-class="hy-tooltip__container--list__btn--hover"
            @tap="setClipboardData"
          >
            <text class="hy-tooltip__container--list__btn--text">复制</text>
          </view>
          <HyLine
            direction="column"
            color="#8d8e90"
            v-if="showCopy && buttons.length > 0"
            length="18"
          ></HyLine>
          <template v-for="(item, index) in buttons" :key="index">
            <view
              class="hy-tooltip__container--list__btn"
              hover-class="hy-tooltip__container--list__btn--hover"
            >
              <text
                class="hy-tooltip__container--list__btn--text"
                @tap="btnClickHandler(index)"
              >
                {{ item }}
              </text>
            </view>
            <HyLine
              direction="column"
              color="#8d8e90"
              v-if="index < buttons.length - 1"
              length="18"
            ></HyLine>
          </template>
        </view>
      </view>
    </HyTransition>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-tooltip",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  inject,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import type { CSSProperties, PropType } from "vue";
import type { ITooltipEmits } from "./typing";
import { type Queue, queueKey, usePopover } from "../../composables";
import type { IPlacementVo } from "../hy-popover/typing";
import { closeOther, removeFromQueue, pushToQueue } from "../../common";

// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyLine from "../hy-line/hy-line.vue";
import HyOverlay from "../hy-overlay/hy-overlay.vue";

/**
 * Tooltip组件主要用于长按操作，类似微信的长按气泡
 * @displayName hy-tooltip
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 需要显示的提示文字 */
  text: {
    type: String,
    default: "",
  },
  /** 点击复制按钮时，复制的文本，为空则使用text值 */
  copyText: {
    type: String,
    default: "",
  },
  /** 文本大小 */
  size: {
    type: [String, Number],
    default: 14,
  },
  /**
   * 触发模式
   * @values longpress,click
   * */
  triggerMode: {
    type: String as PropType<"longpress" | "click">,
    default: "longpress",
  },
  /**
   * 指定 popover 的放置位置
   * @values top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
   * */
  placement: {
    type: String as PropType<IPlacementVo>,
    default: "bottom",
  },
  /** 字体颜色 */
  color: String,
  /** 弹出提示框时，文本的背景色 */
  bgColor: {
    type: String,
    default: "transparent",
  },
  /**
   * 弹出提示的方向
   * @values top,bottom
   * */
  direction: {
    type: String,
    default: "top",
  },
  /** 弹出提示的z-index，nvue无效 */
  zIndex: {
    type: Number,
    default: 10071,
  },
  /** 是否显示复制按钮 */
  showCopy: {
    type: Boolean,
    default: true,
  },
  /** 扩展的按钮组 */
  buttons: {
    type: Array,
    default() {
      return [];
    },
  },
  /** 是否显示透明遮罩以防止触摸穿透 */
  overlay: {
    type: Boolean,
    default: true,
  },
  /** 是否显示遮罩 */
  showToast: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<ITooltipEmits>();

const queue = inject<Queue | null>(queueKey, null);
const { proxy } = getCurrentInstance() as any;
// 显示三角标
const visibleArrow = ref<boolean>(true);
const popover = usePopover(visibleArrow.value);
const showTooltip = ref<boolean>(false);
const tooltipTop = ref<number>(-10000);
const selector: string = "tooltip";

watch(
  () => props.placement,
  () => {
    popover.init(props.placement, visibleArrow.value, selector);
  },
);

watch(
  () => showTooltip.value,
  (newValue) => {
    if (newValue) {
      popover.control(props.placement, 0);
      if (queue && queue.closeOther) {
        queue.closeOther(proxy);
      } else {
        closeOther(proxy);
      }
    }
  },
);

onMounted(() => {
  // getElRect();
  popover.init(props.placement, visibleArrow.value, selector);
});

function onBeforeMount(param: () => void) {}

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy);
  } else {
    pushToQueue(proxy);
  }
});

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy);
  } else {
    removeFromQueue(proxy);
  }
});

// 长按触发事件
const longPressHandler = () => {
  if (props.triggerMode === "longpress") {
    tooltipTop.value = 0;
    showTooltip.value = true;
  }
};

// 点击触发事件
const clickHandler = () => {
  if (props.triggerMode === "click") {
    tooltipTop.value = 0;
    showTooltip.value = true;
  }
};

// 点击关闭
const closeHandler = () => {
  showTooltip.value = false;
};

// 点击操作栏按钮
const btnClickHandler = (index: number) => {
  showTooltip.value = false;
  // 如果需要展示复制按钮，此处index需要加1，因为复制按钮在第一个位置
  emit("click", props.showCopy ? index + 1 : index);
};

// 复制文本到粘贴板
const setClipboardData = () => {
  // 关闭组件
  showTooltip.value = false;
  emit("click", 0);
  uni.setClipboardData({
    // 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
    data: props.copyText || props.text,
    success: () => {
      props.showToast &&
        uni.showToast({
          title: "复制成功",
        });
    },
    fail: () => {
      props.showToast &&
        uni.showToast({
          title: "复制失败",
        });
    },
    complete: () => {
      showTooltip.value = false;
    },
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
