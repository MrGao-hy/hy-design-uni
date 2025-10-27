<template>
  <view class="hy-rate" :id="elId" ref="hy-rate" :style="[customStyle]">
    <view
      class="hy-rate__content"
      @touchmove.stop="touchMove"
      @touchend.stop="touchEnd"
    >
      <view
        class="hy-rate__content--item cursor-pointer"
        v-for="(item, index) in Number(count)"
        :key="index"
        :class="[elClass]"
      >
        <view
          class="hy-rate__content--item__icon-wrap"
          ref="hy-rate__content--item__icon-wrap"
          @tap.stop="clickHandler($event)"
        >
          <HyIcon
            :name="Math.floor(activeIndex) > index ? activeIcon : inactiveIcon"
            :color="
              disabled
                ? '#c8c9cc'
                : Math.floor(activeIndex) > index
                  ? activeColor
                  : inactiveColor
            "
            :custom-style="{
              padding: `0 ${addUnit(gutter / 2)}`,
            }"
            :size="size"
          ></HyIcon>
        </view>
        <view
          v-if="allowHalf"
          @tap.stop="clickHandler($event)"
          class="hy-rate__content--item__icon-wrap hy-rate__content--item__icon-wrap--half"
          :style="[
            {
              width: addUnit(rateWidth / 2),
            },
          ]"
          ref="hy-rate__content--item__icon-wrap"
        >
          <HyIcon
            :name="Math.ceil(activeIndex) > index ? activeIcon : inactiveIcon"
            :color="
              disabled
                ? '#c8c9cc'
                : Math.ceil(activeIndex) > index
                  ? activeColor
                  : inactiveColor
            "
            :custom-style="{
              padding: `0 ${addUnit(gutter / 2)}`,
            }"
            :size="size"
          ></HyIcon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-rate",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { ref, watch, onMounted, getCurrentInstance } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IRateEmits } from "./typing";
import { addUnit, getRect, guid, range, sleep, IconConfig } from "../../libs";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 该组件一般用于满意度调查，星型评分的场景。
 * @displayName hy-rate
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** v-model绑定的值 */
  modelValue: {
    type: Number,
    default: 1,
  },
  /** 星星的默认最多数 */
  count: {
    type: Number,
    default: 5,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 星星的大小 */
  size: {
    type: Number,
    default: 18,
  },
  /** 未激活星星的颜色 */
  inactiveColor: {
    type: String,
    default: "#b2b2b2",
  },
  /** 激活星星的颜色 */
  activeColor: {
    type: String,
    default: "#FFF00D",
  },
  /** 星星之间的间距 */
  gutter: {
    type: Number,
    default: 4,
  },
  /** 最小星星数量 */
  minCount: {
    type: Number,
    default: 1,
  },
  /** 是否允许半星 */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /** 激活状态的图标 */
  activeIcon: {
    type: String,
    default: IconConfig.STAR_FILL,
  },
  /** 未激活状态的图标 */
  inactiveIcon: {
    type: String,
    default: IconConfig.STAR,
  },
  /** 是否可触摸 */
  touchable: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IRateEmits>();

const elId = guid();
const elClass = guid();
const rateBoxLeft = ref<number>(0);
const activeIndex = ref(props.modelValue);
// 每个星星的宽度
const rateWidth = ref(0);
// 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
const moving = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    activeIndex.value = newValue;
  },
);
watch(
  () => activeIndex.value,
  () => {
    emitEvent();
  },
);
const instance = getCurrentInstance();

onMounted(() => {
  init();
});

const init = () => {
  sleep(300).then(async () => {
    await getRateItemRect();
    await getRateIconWrapRect();
  });
};

/**
 * @description 获取评分组件盒子的布局信息
 * */
const getRateItemRect = async () => {
  await sleep();
  // #ifndef APP-NVUE
  const res: UniApp.NodeInfo = (await getRect(
    `#${elId}`,
    false,
    instance,
  )) as UniApp.NodeInfo;
  rateBoxLeft.value = res.left || 0;
  // #endif
};

/**
 * @description 获取单个星星的尺寸
 * */
const getRateIconWrapRect = async () => {
  // uView封装的获取节点的方法，详见文档
  // #ifndef APP-NVUE
  const res: UniApp.NodeInfo = (await getRect(
    `.${elClass}`,
    false,
    instance,
  )) as UniApp.NodeInfo;
  rateWidth.value = res.width || 0;
  // #endif
};
// 手指滑动
const touchMove = (e: TouchEvent) => {
  // 如果禁止通过手动滑动选择，返回
  if (!props.touchable) {
    return;
  }
  e.stopPropagation();
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};
// 停止滑动
const touchEnd = (e: TouchEvent) => {
  // 如果禁止通过手动滑动选择，返回
  if (!props.touchable) {
    return;
  }
  e.stopPropagation();
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};
// 通过点击，直接选中
const clickHandler = (e: TouchEvent) => {
  // if (moving.value) {
  //   return;
  // }
  e.stopPropagation();
  let x = 0;
  // #ifndef APP-NVUE || MP-ALIPAY
  x = e.detail.x;
  // #endif
  // #ifdef MP-ALIPAY
  x = e.detail.pageX;
  // #endif
  getActiveIndex(x, true);
};
// 发出事件
const emitEvent = () => {
  // 发出change事件
  emit("change", activeIndex.value);
  // 同时修改双向绑定的值
  emit("update:modelValue", activeIndex.value);
};
// 获取当前激活的评分图标
const getActiveIndex = (x: number, isClick = false) => {
  if (props.disabled || props.readonly) {
    return;
  }
  // 判断当前操作的点的x坐标值，是否在允许的边界范围内
  const allRateWidth = rateWidth.value * props.count + rateBoxLeft.value;
  // 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
  x = range(rateBoxLeft.value, allRateWidth, x) - rateBoxLeft.value;
  // 滑动点相对于评分盒子左边的距离
  const distance = x;
  // 滑动的距离，相当于多少颗星星
  let index;
  // 判断是否允许半星
  if (props.allowHalf) {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    if (decimal <= rateWidth.value / 2 && decimal > 0) {
      index += 0.5;
    } else if (decimal > rateWidth.value / 2) {
      index++;
    }
  } else {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    // 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
    if (isClick) {
      if (decimal > 0) index++;
    } else {
      if (decimal > rateWidth.value / 2) index++;
    }
  }
  activeIndex.value = Math.min(index, props.count);
  // 对最少颗星星的限制
  if (activeIndex.value < props.minCount) {
    activeIndex.value = props.minCount;
  }

  // 设置延时为了让click事件在touchmove之前触发
  setTimeout(() => {
    moving.value = true;
  }, 10);
  // 一定时间后，取消标识为移动中状态，是为了让click事件无效
  setTimeout(() => {
    moving.value = false;
  }, 10);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
