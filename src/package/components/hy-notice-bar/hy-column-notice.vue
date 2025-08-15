<template>
  <view class="hy-notice" @tap="clickHandler">
    <slot name="icon">
      <view class="hy-notice__left-icon" v-if="icon">
        <HyIcon :name="icon" :color="color" size="19"></HyIcon>
        <!--        <HyIcon :name="icon" :color="color" size="19"></HyIcon>-->
      </view>
    </slot>
    <swiper
      :disable-touch="disableTouch"
      :vertical="step ? false : true"
      circular
      :interval="duration"
      :autoplay="true"
      class="hy-notice__swiper"
      @change="noticeChange"
    >
      <swiper-item
        v-for="(item, index) in text"
        :key="index"
        class="hy-notice__swiper__item"
        :style="{ justifyContent: justifyContent }"
      >
        <text class="hy-notice__swiper__item__text" :style="[textStyle]">{{
          item
        }}</text>
      </swiper-item>
    </swiper>
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
        :name="IconConfig.CLOSE"
        :size="16"
        :color="color"
        @click="close"
      ></HyIcon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type CSSProperties, toRefs, computed, ref, watch } from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit, error } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { text, fontSize, color } = toRefs(props);
const emit = defineEmits(["click", "close"]);

const index = ref(0);

watch(
  () => text.value,
  (newVal) => !Array.isArray(newVal) && error("传入值必须是数组"),
  { immediate: true },
);

/**
 * @description 文字内容的样式
 * */
const textStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  style.color = color.value;
  style.fontSize = addUnit(fontSize.value);
  return style;
});

const noticeChange = (e: any) => {
  index.value = e.detail.current;
};

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
