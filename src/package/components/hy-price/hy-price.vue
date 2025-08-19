<template>
  <text
    :class="['hy-price', customClass]"
    :style="priceStyle"
    @tap="handleClick"
  >
    <text class="hy-price__prefix">{{ symbol }}</text>
    <text
      class="hy-price__text"
      :style="[{ 'font-size': addUnit(getPx(size) * ratio) }]"
    >
      {{ priceOne[0] }}
    </text>
    <text class="hy-price__decimal">
      {{ "." + priceOne[1].slice(0, num) }}
    </text>
  </text>
</template>

<script lang="ts">
export default {
  name: "hy-price",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit, getPx } from "../../utils";

/**
 * 业务组件,突出金额小数点前大，小数点后小
 * @displayName hy-price
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 传入金额值 */
  text: String,
  /** 金额符号 */
  symbol: {
    type: String,
    default: "￥",
  },
  /** 比例大小 */
  ratio: {
    type: Number,
    default: 1.4,
  },
  /** 保留小数点后几位数 */
  num: {
    type: Number,
    default: 2,
  },
  /** 字体颜色 */
  color: {
    type: String,
    default: "#FE3232",
  },
  /** 字体大小 */
  size: {
    type: Number,
    default: 12,
  },
  /** 字体粗细 */
  weight: {
    type: Number,
    default: 500,
  },
  /** 是否倾斜 */
  slant: {
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
const { text, color, weight, size, slant, customStyle } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 价格整体样式
 * */
const priceStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    color: color.value,
    fontWeight: weight.value,
    fontStyle: slant.value ? "oblique" : "",
    fontSize: addUnit(size.value),
  };

  return Object.assign(style, customStyle.value);
});

/**
 * @description 价格处理
 * */
const priceOne = computed(() => {
  let value = "";
  if (typeof text.value !== "string") {
    value = text.value.toString();
  } else {
    value = text.value;
  }
  if (/\./g.test(value)) {
    if (Number(value)) {
      return value.split(".");
    } else {
      return ["0", "00"];
    }
  } else {
    return [value, "000000"];
  }
});

/**
 * @description 点击事件
 * */
const handleClick = () => {
  emit("click", text.value);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
