<template>
  <view class="hy-checkbox-group" :class="bemClass">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import type { CSSProperties, PropType } from "vue";
import { bem } from "../../utils";
import type { ICheckBoxGroupEmits } from "./typing";

/**
 * 复选框组件一般用于需要多个选择的场景，需要搭配hy-checkbox-item组件一起使用
 * @displayName hy-checkbox-group
 */
defineOptions({});

const props = defineProps({
  /** 双向绑定值，数组类型 */
  modelValue: {
    type: Array<string | number>,
    required: true,
  },
  /**
   * 标签的大小
   * @values small,medium,large
   * */
  size: {
    type: String,
    default: "medium",
  },
  /**
   * 标签的形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: "square",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 选中状态下的颜色 */
  activeColor: String,
  /** 未选中的颜色 */
  inactiveColor: {
    type: String,
    default: "#c8c9cc",
  },
  /** 图标的大小，单位px */
  iconSize: {
    type: [String, Number],
    default: "20",
  },
  /** 图标颜色 */
  iconColor: String,
  /**
   * 勾选图标的对齐方式
   * @values left,right
   * */
  iconPlacement: {
    type: String,
    default: "left",
  },
  /** 竖向配列时，是否显示下划线 */
  borderBottom: {
    type: Boolean,
    default: false,
  },
  /** label的字体大小，px单位 */
  labelSize: [String, Number],
  /** label的颜色 */
  labelColor: String,
  /** 是否禁止点击提示语选中复选框 */
  labelDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 排列方式
   * @values row,column
   * */
  placement: {
    type: String,
    default: "row",
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<ICheckBoxGroupEmits>();

const bemClass = computed(() => {
  return bem("checkbox-group", props, ["placement"]);
});

provide("hy-checkbox-group", {
  ...props,
  setCheckedStatus(value: string | number) {
    let arr = [...props.modelValue];
    if (props.modelValue?.includes(value)) {
      arr = props.modelValue?.filter((item) => item !== value);
    } else {
      arr.push(value);
    }
    emit("update:modelValue", arr);
    emit("change", arr);
  },
});
</script>

<style lang="scss" scoped>
@import "./index";
</style>
