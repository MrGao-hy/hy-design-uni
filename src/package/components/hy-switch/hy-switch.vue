<template>
  <view
    :class="[
      'hy-switch cursor-pointer',
      disabled && 'hy-switch--disabled',
      isActive ? 'hy-switch--active' : 'hy-switch--container',
      customClass,
    ]"
    :style="[switchStyle, customStyle]"
    @tap="clickHandler"
  >
    <view class="hy-switch--bg" :style="[bgStyle]"></view>
    <view
      :class="['hy-switch--node', modelValue && 'hy-switch__node--on']"
      :style="[nodeStyle]"
      ref="hy-switch__node"
    >
      <hy-loading
        :show="loading"
        :size="switchSize * 0.6"
        mode="circle"
      ></hy-loading>
      <view class="" v-if="!loading">
        <slot>
          <HyIcon
            :name="modelValue ? activeIcon : inactiveIcon"
            :size="icon?.size || switchSize * 0.6"
            :color="icon?.color"
            :bold="icon?.bold"
            :customPrefix="icon?.customPrefix"
            :imgMode="icon?.imgMode"
            :width="icon?.width"
            :height="icon?.height"
            :top="icon?.top"
            :stop="icon?.stop"
            :round="icon?.round"
            :customStyle="icon?.customStyle"
          ></HyIcon>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-switch",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { toRefs, watch, nextTick, computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit, error } from "../../utils";
import type { ISwitchEmits } from "./typing";
// 组件
import HyLoading from "../hy-loading/hy-loading.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import type HyIconProps from "../hy-icon/typing";

/**
 * 选择开关用于在打开和关闭状态之间进行切换。
 * @displayName hy-switch
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 通过v-model双向绑定的值 */
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /** 是否处于加载中 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 开关尺寸，单位px */
  size: {
    type: String,
    default: "medium",
  },
  /** 打开时的背景色 */
  activeColor: String,
  /** 关闭时的背景色 */
  inactiveColor: String,
  /** 打开选择器时通过change事件发出的值 */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /** 关闭选择器时通过change事件发出的值 */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /** 打开选择器时图标 */
  activeIcon: String,
  /** 关闭选择器时图标 */
  inactiveIcon: String,
  /** 图标 */
  icon: Object as unknown as PropType<HyIconProps>,
  /** 是否开启异步变更，开启后需要手动控制输入值 */
  asyncChange: {
    type: Boolean,
    default: false,
  },
  /** 圆点与外边框的距离 */
  space: {
    type: Number,
    default: 0,
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const {
  modelValue,
  size,
  space,
  inactiveValue,
  activeValue,
  activeColor,
  disabled,
  loading,
  asyncChange,
  inactiveColor,
} = toRefs(props);
const emit = defineEmits<ISwitchEmits>();

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue !== inactiveValue.value && newValue !== activeValue.value) {
      error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
    }
  },
  { immediate: true },
);

/**
 * @description 是否打开
 * */
const isActive = computed(() => {
  return modelValue.value === activeValue.value;
});

/**
 * @description 设置开关大小
 * */
const switchSize = computed((): number => {
  const sz: AnyObject = {
    small: 20,
    medium: 25,
    large: 30,
  };

  return typeof size.value === "number"
    ? size.value
    : sz[size.value] || Number(size.value);
});

/**
 * @description 开关样式
 * */
const switchStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
  style.width = addUnit(switchSize.value * 2 + 2);
  style.height = addUnit(switchSize.value + 2);
  // style.borderColor = this.value ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)'
  // 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
  // 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
  if (customInactiveColor.value) {
    style.borderColor = "rgba(0, 0, 0, 0)";
  }
  style.backgroundColor = isActive.value
    ? activeColor.value
    : inactiveColor.value;
  return style;
});

/**
 * @description 圆圈样式
 * */
const nodeStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
  style.width = addUnit(switchSize.value - space.value);
  style.height = addUnit(switchSize.value - space.value);
  const translateX = isActive.value
    ? addUnit(space.value)
    : addUnit(switchSize.value);
  style.transform = `translateX(-${translateX})`;
  return style;
});

/**
 * @description 背景样式
 * */
const bgStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 这里配置一个多余的元素在HTML中，是为了让switch切换时，有更良好的背景色扩充体验(见实际效果)
  style.width = addUnit(switchSize.value * 2 - switchSize.value / 2);
  style.height = addUnit(switchSize.value);
  style.backgroundColor = inactiveColor.value;
  // 打开时，让此元素收缩，否则反之
  style.transform = `scale(${isActive.value ? 0 : 1})`;
  return style;
});

/**
 * @description 自定义颜色
 * */
const customInactiveColor = computed(() => {
  // 之所以需要判断是否自定义了“非激活”颜色，是为了让node圆点离外边框更宽一点的距离
  return inactiveColor.value !== "#fff" && inactiveColor.value !== "#ffffff";
});

/**
 * @description 点击事件
 * */
const clickHandler = () => {
  if (!disabled.value && !loading.value) {
    const oldValue = isActive.value ? inactiveValue.value : activeValue.value;
    if (!asyncChange.value) {
      emit("update:modelValue", oldValue);
    }
    // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
    nextTick(() => {
      emit("change", oldValue);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
