<template>
  <!--注意阻止横向滑动的穿透：横向移动时阻止冒泡-->
  <view
    class="hy-swipe-action"
    @click.stop="onClick"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <!--容器-->
    <view class="hy-swipe-action__wrapper" :style="wrapperStyle">
      <!--左侧操作-->
      <view
        :class="['hy-swipe-action__left', leftClass]"
        @click="onClick('left')"
      >
        <slot name="left" />
      </view>
      <!--左侧操作-->

      <!--内容-->
      <view
        :class="[
          'hy-swipe-action__center',
          borderBottom && 'hy-border__bottom',
        ]"
      >
        <slot></slot>
      </view>
      <!--内容-->

      <!--右侧操作-->
      <view
        :class="['hy-swipe-action__right', rightClass]"
        @click="onClick('right')"
      >
        <slot name="right">
          <view v-if="!slots.left" class="hy-swipe-action__right--action">
            <view
              class="hy-swipe-action__right--action__btn"
              v-for="(item, i) in options"
              :style="item.style"
              @tap.stop="onActiveClick(item, i)"
            >
              {{ item.text }}
            </view>
          </view>
        </slot>
      </view>
      <!--右侧操作-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-swipe-action",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>
<script lang="ts" setup>
import {
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  useSlots,
} from "vue";
import type { PropType } from "vue";
import type {
  ISwipeActionEmits,
  SwipeActionStatus,
  SwipeActionPosition,
  SwipeActionReason,
  SwipeActionOptionsVo,
} from "./typing";
import { useTouch, getRect, guid } from "../../libs";
import { closeOther, pushToQueue, removeFromQueue } from "./index";

/**
 * 常用于单元格左右滑删除等手势操作。
 * @displayName hy-swipe-action
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /**
   * 滑动按钮的状态，使用v-model进行双向绑定。
   * @values left,close,right
   * */
  modelValue: String as PropType<SwipeActionStatus>,
  /** 是否禁用滑动操作 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 显示底部边框 */
  borderBottom: {
    type: Boolean,
    default: false,
  },
  /** 右侧按钮内容 */
  options: {
    type: Array as unknown as PropType<SwipeActionOptionsVo[]>,
    default: () => [
      {
        text: "收藏",
        style: {
          backgroundColor: "#3c9cff",
        },
      },
      {
        text: "删除",
        style: {
          backgroundColor: "#f56c6c",
        },
      },
    ],
  },
  /** 动画过渡时间，单位ms */
  duration: {
    type: Number,
    default: 300,
  },
  /** 关闭滑动按钮前的钩子函数 */
  beforeClose: Function,
});
const emit = defineEmits<ISwipeActionEmits>();
const leftClass = `hy-swipe-action__left--${guid()}`;
const rightClass = `hy-swipe-action__right--${guid()}`;

const slots = useSlots();
const wrapperStyle = ref<string>("");

// 滑动开始时，wrapper的偏移量
const originOffset = ref<number>(0);
// wrapper现在的偏移量
const wrapperOffset = ref<number>(0);
// 是否处于滑动状态
const touching = ref<boolean>(false);

const touch = useTouch();

const { proxy } = getCurrentInstance() as any;

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    changeState(newVal, oldVal);
  },
  {
    deep: true,
  },
);

onBeforeMount(() => {
  pushToQueue(proxy);
  // 滑动开始时，wrapper的偏移量
  originOffset.value = 0;
  // wrapper现在的偏移量
  wrapperOffset.value = 0;
  // 是否处于滑动状态
  touching.value = false;
});

onMounted(() => {
  touching.value = true;
  changeState(props.modelValue);
  touching.value = false;
});

onBeforeUnmount(() => {
  removeFromQueue(proxy);
});

function changeState(value?: SwipeActionStatus, old?: SwipeActionStatus) {
  if (props.disabled) {
    return;
  }
  getWidths().then(([leftWidth, rightWidth]) => {
    switch (value) {
      case "close":
        // 调用此函数时，偏移量本就是0
        if (wrapperOffset.value === 0) return;
        close("value", old);
        break;
      case "left":
        swipeMove(leftWidth);
        break;
      case "right":
        swipeMove(-rightWidth);
        break;
    }
  });
}

/**
 * @description 获取左/右操作按钮的宽度
 * @return {Promise<[Number, Number]>} 左宽度、右宽度
 */
const getWidths = (): Promise<number[]> => {
  return Promise.all([
    getRect("." + leftClass, false, proxy).then((rect) => {
      return rect.width ? rect.width : 0;
    }),
    getRect("." + rightClass, false, proxy).then((rect) => {
      return rect.width ? rect.width : 0;
    }),
  ]);
};
/**
 * @description wrapper滑动函数
 * @param {Number} offset 滑动漂移量
 */
function swipeMove(offset = 0) {
  // this.offset = offset
  const transform = `translate3d(${offset}px, 0, 0)`;
  // 跟随手指滑动，不需要动画
  const transition = touching.value
    ? "none"
    : ".6s cubic-bezier(0.18, 0.89, 0.32, 1)";
  wrapperStyle.value = `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `;
  // 记录容器当前偏移的量
  wrapperOffset.value = offset;
}
/**
 * @description click的handler
 * @param position
 */
function onClick(position?: SwipeActionPosition) {
  if (props.disabled || wrapperOffset.value === 0) {
    return;
  }

  position = position || "inside";
  close("click", position);
  emit("click", position);
}
/**
 * @description 开始滑动
 */
function startDrag(event: TouchEvent) {
  if (props.disabled) return;

  originOffset.value = wrapperOffset.value;
  touch.touchStart(event);
  closeOther(proxy);
}
/**
 * @description 滑动时，逐渐展示按钮
 * @param event
 */
function onDrag(event: TouchEvent) {
  if (props.disabled) return;

  touch.touchMove(event);
  if (touch.direction.value === "vertical") {
    return;
  } else {
    event.preventDefault();
    event.stopPropagation();
  }

  touching.value = true;

  // 本次滑动，wrapper应该设置的偏移量
  const offset = originOffset.value + touch.deltaX.value;
  getWidths().then(([leftWidth, rightWidth]) => {
    // 如果需要想滑出来的按钮不存在，对应的按钮肯定滑不出来，容器处于初始状态。此时需要模拟一下位于此处的start事件。
    if ((leftWidth === 0 && offset > 0) || (rightWidth === 0 && offset < 0)) {
      swipeMove(0);
      return startDrag(event);
    }
    // 按钮已经展示完了，再滑动没有任何意义，相当于滑动结束。此时需要模拟一下位于此处的start事件。
    if (leftWidth !== 0 && offset >= leftWidth) {
      swipeMove(leftWidth);
      return startDrag(event);
    } else if (rightWidth !== 0 && -offset >= rightWidth) {
      swipeMove(-rightWidth);
      return startDrag(event);
    }
    swipeMove(offset);
  });
}
/**
 * @description 滑动结束，自动修正位置
 */
function endDrag() {
  if (props.disabled) return;
  // 滑出"操作按钮"的阈值
  const THRESHOLD = 0.3;
  touching.value = false;

  getWidths().then(([leftWidth, rightWidth]) => {
    if (
      originOffset.value < 0 && // 之前展示的是右按钮
      wrapperOffset.value < 0 && // 目前仍然是右按钮
      wrapperOffset.value - originOffset.value < rightWidth * THRESHOLD // 并且滑动的范围不超过右边框阀值
    ) {
      swipeMove(-rightWidth); // 回归右按钮
      emit("update:modelValue", "right");
    } else if (
      originOffset.value > 0 && // 之前展示的是左按钮
      wrapperOffset.value > 0 && // 现在仍然是左按钮
      originOffset.value - wrapperOffset.value < leftWidth * THRESHOLD // 并且滑动的范围不超过左按钮阀值
    ) {
      swipeMove(leftWidth); // 回归左按钮
      emit("update:modelValue", "left");
    } else if (
      rightWidth > 0 &&
      originOffset.value >= 0 && // 之前是初始状态或者展示左按钮显
      wrapperOffset.value < 0 && // 现在展示右按钮
      Math.abs(wrapperOffset.value) > rightWidth * THRESHOLD // 视图中已经展示的右按钮长度超过阀值
    ) {
      swipeMove(-rightWidth);
      emit("update:modelValue", "right");
    } else if (
      leftWidth > 0 &&
      originOffset.value <= 0 && // 之前初始状态或者右按钮显示
      wrapperOffset.value > 0 && // 现在左按钮
      Math.abs(wrapperOffset.value) > leftWidth * THRESHOLD // 视图中已经展示的左按钮长度超过阀值
    ) {
      swipeMove(leftWidth);
      emit("update:modelValue", "left");
    } else {
      // 回归初始状态
      close("swipe");
    }
  });
}
/**
 * @description 关闭操过按钮，并在合适的时候调用 beforeClose
 */
function close(reason: SwipeActionReason, position?: SwipeActionPosition) {
  if (reason === "swipe" && originOffset.value === 0) {
    // offset：0 ——> offset：0
    return swipeMove(0);
  } else if (reason === "swipe" && originOffset.value > 0) {
    // offset > 0 ——> offset：0
    position = "left";
  } else if (reason === "swipe" && originOffset.value < 0) {
    // offset < 0 ——> offset：0
    position = "right";
  }

  if (reason && position) {
    props.beforeClose && props.beforeClose(reason, position);
  }

  swipeMove(0);
  if (props.modelValue !== "close") {
    emit("update:modelValue", "close");
  }
}

const onActiveClick = (item: any, index: number) => {
  close("click", "right");
  emit("clickAction", item, index);
};

defineExpose({ close });
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
