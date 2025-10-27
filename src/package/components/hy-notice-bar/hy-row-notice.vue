<template>
  <view class="hy-notice" @tap="clickHandler">
    <slot name="icon">
      <view class="hy-notice__left-icon" v-if="icon">
        <HyIcon :name="icon" :color="color" size="19"></HyIcon>
      </view>
    </slot>
    <view class="hy-notice__content" ref="hy-notice__content">
      <view
        ref="hy-notice__content--text"
        class="hy-notice__content--text"
        :style="animationStyle"
      >
        <text
          v-for="(item, index) in innerText"
          :key="index"
          :style="textStyle"
          >{{ item }}</text
        >
      </view>
    </view>
    <view
      class="hy-notice__right-icon"
      v-if="['link', 'closable'].includes(mode)"
    >
      <HyIcon
        v-if="mode === 'link'"
        :name="IconConfig.RIGHT"
        :size="17"
        :color="color"
      ></HyIcon>
      <HyIcon
        v-if="mode === 'closable'"
        @click="close"
        :name="IconConfig.CLOSE"
        :size="16"
        :color="color"
      ></HyIcon>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  toRefs,
  computed,
  type CSSProperties,
  getCurrentInstance,
} from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit, getRect, sleep, IconConfig } from "../../libs";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { text, speed, fontSize, color } = toRefs(props);
const emit = defineEmits(["click", "close"]);

const instance = getCurrentInstance();
const animationDuration = ref<string>("0"); // 动画执行时间
const animationPlayState = ref<string>("paused"); // 动画的开始和结束执行
const initValue = ref<string>("");

watch(
  () => text.value,
  async (newValue) => {
    initValue.value = Array.isArray(newValue) ? newValue.join("") : newValue;
    let boxWidth = 0,
      textWidth = 0;
    // 进行一定的延时
    await sleep();
    // 查询盒子和文字的宽度
    textWidth = (await getRect(".hy-notice__content--text", false, instance))
      .width;
    boxWidth = (await getRect(".hy-notice__content", false, instance)).width;
    // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为中设置了.u-notice-content样式中设置了padding-left: 100%
    // 恰巧计算出来的结果中已经包含了#u-notice-box的宽度
    animationDuration.value = `${textWidth / speed.value}s`;
    // 这里必须这样开始动画，否则在APP上动画速度不会改变
    animationPlayState.value = "paused";
    await sleep(10);
    animationPlayState.value = "running";
  },
  { immediate: true },
);

/**
 * @description 文字内容的样式
 * */
const textStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  style.whiteSpace = "nowrap !important";
  style.color = color.value;
  style.fontSize = addUnit(fontSize.value);
  return style;
});
/**
 * @description 动画的样式
 * */
const animationStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  style.animationDuration = animationDuration.value;
  style.animationPlayState = animationPlayState.value;
  return style;
});
// 内部对用户传入的数据进一步分割，放到多个text标签循环，否则如果用户传入的字符串很长（100个字符以上）
// 放在一个text标签中进行滚动，在低端安卓机上，动画可能会出现抖动现象，需要分割到多个text中可解决此问题
const innerText = computed(() => {
  let result = [],
    // 每组text标签的字符长度
    len = 20;
  const textArr = initValue.value.split("");
  for (let i = 0; i < textArr.length; i += len) {
    // 对拆分的后的text进行slice分割，得到的为数组再进行join拼接为字符串
    result.push(textArr.slice(i, i + len).join(""));
  }
  return result;
});

/**
 * @description 点击通告栏
 * */
const clickHandler = (index: number) => {
  emit("click", index);
};
/**
 * @description 点击关闭按钮
 * */
const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
