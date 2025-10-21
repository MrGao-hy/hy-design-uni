<template>
  <HyPopup
    mode="center"
    :zoom="zoom"
    :show="modelValue"
    :round="round"
    :customStyle="{
      overflow: 'hidden',
      marginTop: `-${addUnit(negativeTop)}`,
    }"
    :closeOnClickOverlay="closeOnClickOverlay"
    :safeAreaInsetBottom="false"
    :duration="400"
    @click="clickHandler"
  >
    <view
      class="hy-modal"
      :style="{
        width: addUnit(width),
      }"
    >
      <view class="hy-modal__title" v-if="title">{{ title }}</view>
      <view
        class="hy-modal__content"
        :style="{
          paddingTop: `${title ? 12 : 25}px`,
        }"
      >
        <slot>
          <text class="hy-modal__content--text">
            {{ content }}
          </text>
        </slot>
      </view>
      <view
        class="hy-modal__button--group__confirm-button"
        v-if="$slots.confirmButton"
      >
        <slot name="confirmButton"></slot>
      </view>
      <template v-else>
        <view
          :class="[
            'hy-modal__button--group',
            showCancelButton &&
              showConfirmButton &&
              (!buttonReverse
                ? 'hy-modal__button--exact'
                : 'hy-modal__button--exact--reverse'),
          ]"
          :style="{
            flexDirection: buttonReverse ? 'row-reverse' : 'row',
          }"
        >
          <view
            class="hy-modal__button--group__wrapper first hy-modal__button--group__wrapper--cancel"
            :hover-stay-time="150"
            hover-class="hy-modal__button--group__wrapper--hover"
            v-if="showCancelButton"
            @tap.stop="cancelHandler"
          >
            <text
              class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--cancel__text"
              :style="{
                color: cancelColor,
              }"
            >
              {{ cancelText }}
            </text>
          </view>
          <view
            class="hy-modal__button--group__wrapper last hy-modal__button--group__wrapper--confirm"
            :hover-stay-time="150"
            hover-class="hy-modal__button--group__wrapper--hover"
            v-if="showConfirmButton"
            @tap="confirmHandler"
          >
            <HyLoading v-if="load" mode="circle"></HyLoading>
            <text
              v-else
              class="hy-modal__button--group__wrapper--text hy-modal__button--group__wrapper--confirm__text"
              :style="{
                color: confirmColor,
              }"
            >
              {{ confirmText }}
            </text>
          </view>
        </view>
      </template>
    </view>
  </HyPopup>
</template>

<script lang="ts">
export default {
  name: "hy-modal",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import type { IModalEmits } from "./typing";
import { addUnit, sleep } from "../../utils";
// 组件
import HyPopup from "../hy-popup/hy-popup.vue";
import HyLoading from "../hy-loading/hy-loading.vue";

/**
 * 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。
 * @displayName hy-modal
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否显示模态框 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 标题内容 */
  title: String,
  /** 模态框内容，如传入slot内容，则此参数无效 */
  content: String,
  /** 确认按钮的文字 */
  confirmText: {
    type: String,
    default: "确认",
  },
  /** 取消按钮的文字 */
  cancelText: {
    type: String,
    default: "取消",
  },
  /** 是否显示确认按钮 */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  /** 确认按钮的颜色 */
  confirmColor: String,
  /** 取消按钮的颜色 */
  cancelColor: String,
  /** 对调确认和取消的位置 */
  buttonReverse: {
    type: Boolean,
    default: false,
  },
  /** 是否开启缩放模式 */
  zoom: {
    type: Boolean,
    default: true,
  },
  /** 弹窗的圆角 */
  round: {
    type: [String, Number],
    default: 16,
  },
  /** 点击确认按钮自动关闭 */
  autoClose: {
    type: Boolean,
    default: true,
  },
  /** 加载按钮 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否允许点击遮罩关闭Modal */
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  /** 往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 */
  negativeTop: {
    type: Number,
    default: 0,
  },
  /** modal宽度，不支持百分比，可以数值，px，rpx单位 */
  width: {
    type: [String, Number],
    default: "550rpx",
  },
  /**
   * 确认按钮的样式,如设置，将不会显示取消按钮
   * @values circle,square
   * */
  confirmButtonShape: String,
  /**
   * 文案对齐方式
   * @values left,center,right
   * */
  contentTextAlign: {
    type: String,
    default: "left",
  },
});
const emit = defineEmits<IModalEmits>();
const load = ref(props.loading);

watch(
  () => props.loading,
  (newVal) => {
    load.value = props.loading;
  },
);

watch(
  () => props.modelValue,
  (newVal) => {
    console.log(newVal, "newVal");
    if (!newVal) load.value = false;
  },
);

/**
 * @description 点击确定按钮
 * */
const confirmHandler = async () => {
  console.log(load.value, "props.loading");
  if (load.value) return;
  // 如果配置了异步关闭，将按钮值为loading状态
  emit("confirm");

  await sleep();
  if (!props.loading && props.autoClose) {
    emit("update:modelValue", false);
  }
};

/**
 * @description 点击取消按钮
 * */
const cancelHandler = () => {
  emit("update:modelValue", false);
  emit("cancel");
};

/**
 * @description 点击遮罩
 * */
const clickHandler = () => {
  if (props.closeOnClickOverlay) {
    emit("update:modelValue", false);
    emit("close");
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
.modal__content__text {
  text-align: v-bind(contentTextAlign);
}
</style>
