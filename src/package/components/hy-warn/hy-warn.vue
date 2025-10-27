<template>
  <HyTransition mode="fade" :show="show">
    <view
      :class="['hy-warn', `hy-warn__${type}--${theme}`, customClass]"
      @tap.stop="clickHandler"
      :style="customStyle"
    >
      <view class="hy-warn__icon--left tips" v-if="showIcon">
        <HyIcon :name="iconName(type)" size="21" :color="iconColor"></HyIcon>
      </view>
      <view
        class="hy-warn__content"
        :style="[
          {
            paddingRight: closable ? '20px' : 0,
          },
        ]"
      >
        <text
          class="hy-warn__content--title"
          v-if="title"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            theme === 'dark'
              ? 'hy-warn__text--dark'
              : `hy-warn__text--${type}__light`,
          ]"
        >
          {{ title }}
        </text>
        <text
          v-if="description"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            'hy-warn__content--desc',
            theme === 'dark'
              ? 'hy-warn__text--dark'
              : `hy-warn__text--${type}__light`,
          ]"
        >
          {{ description }}
        </text>
      </view>
      <view class="hy-warn__right" v-if="$slots.right">
        <slot name="right"></slot>
      </view>
      <view class="hy-warn__close" v-if="closable" @tap.stop="closeHandler">
        <HyIcon :name="IconConfig.CLOSE" :color="iconColor" size="15"></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: "hy-warn",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IWarnEmits } from "./typing";
import { addUnit, IconConfig, iconName } from "../../libs";
// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 警告提示，展现需要关注的信息
 * @displayName hy-warn
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 显示的文字 */
  title: String,
  /**
   * 使用预设的颜色
   * @values primary,success,warning,error,info
   * */
  type: {
    type: String,
    default: "warning",
  },
  /** 辅助性文字，颜色比title浅一点，字号也小一点 */
  description: String,
  /** 显示关闭按钮 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示左边的辅助图标 */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /** 显示的暗色或者亮色 */
  theme: {
    type: String as PropType<HyApp.DarkModeType>,
    default: "dark",
  },
  /** 文字是否居中 */
  center: {
    type: Boolean,
    default: false,
  },
  /** 字体大小 */
  fontSize: {
    type: [String, Number],
    default: 14,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IWarnEmits>();

const show = ref<boolean>(true);

/**
 * @description icon颜色
 * */
const iconColor = computed(() => {
  return props.theme === "light" ? props.type : "#fff";
});

/**
 * @description 点击内容
 * */
const clickHandler = () => {
  emit("click");
};
/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
