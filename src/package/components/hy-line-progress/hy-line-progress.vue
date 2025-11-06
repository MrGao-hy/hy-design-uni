<template>
  <view :class="['hy-line-progress', customClass]" :style="customStyle">
    <view
      class="hy-line-progress__background"
      ref="hy-line-progress__background"
      :style="{
        backgroundColor: inactiveColor,
        height: addUnit(height),
      }"
    ></view>
    <view class="hy-line-progress__line" :style="[progressStyle]">
      <slot>
        <text
          v-if="showText && percentage >= 10"
          class="hy-line-progress__text"
          :style="{
            fontSize: fontSize ? addUnit(fontSize) : addUnit(getPx(height)),
          }"
        >
          {{ innserPercentage + "%" }}
        </text>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-line-progress",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import {
  addUnit,
  getRect,
  range,
  type RectResultType,
  sleep,
  getPx,
} from "../../libs";

/**
 * 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。
 * @displayName hy-line-progress
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 激活部分的颜色 */
  activeColor: String,
  /** 背景色 */
  inactiveColor: String,
  /** 进度百分比，数值 */
  percentage: {
    type: Number,
    default: 0,
  },
  /** 是否在进度条内部显示百分比的值 */
  showText: {
    type: Boolean,
    default: true,
  },
  /** 进度条的高度，单位px */
  height: {
    type: [String, Number],
    default: 8,
  },
  /** 字体大小，单位px */
  fontSize: [String, Number],
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});

const instance = getCurrentInstance();
const lineWidth = ref<string | number>(0);

watch(
  () => props.percentage,
  () => resizeProgressWidth(),
);

const progressStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.width = lineWidth.value;
  style.backgroundColor = props.activeColor;
  style.height = addUnit(props.height);
  return style;
});

const innserPercentage = computed(() => {
  // 控制范围在0-100之间
  return range(0, 100, props.percentage);
});

onMounted(() => {
  init();
});

const init = async () => {
  await sleep(20);
  await resizeProgressWidth();
};
const getProgressWidth = (): Promise<RectResultType<false>> => {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    resolve(getRect(".hy-line-progress__background", false, instance));
    // #endif
  });
};

/**
 * @description 计算轨道长度
 * */
const resizeProgressWidth = async () => {
  const { width } = await getProgressWidth();
  // 通过设置的percentage值，计算其所占总长度的百分比
  if (!width) return;
  lineWidth.value = addUnit((width * innserPercentage.value) / 100);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
