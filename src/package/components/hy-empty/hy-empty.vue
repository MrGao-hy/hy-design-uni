<template>
  <view :class="['hy-empty', customClass]" v-if="show" :style="emptyStyle">
    <view class="hy-empty__img" :style="imgStyle">
      <HyIcon
        :name="imageUrl || emptyIcon[mode].icon"
        :width="width"
        :height="height"
        img-mode="widthFix"
      ></HyIcon>
    </view>
    <view v-if="$slots.default">
      <slot></slot>
    </view>
    <view class="hy-empty__description" v-else>
      <slot v-if="$slots.description" name="description"></slot>
      <text v-else :style="descriptionStyle">{{
        emptyDescription || emptyIcon[mode].name
      }}</text>
      <view class="hy-empty__button" v-if="button?.text">
        <HyButton
          :text="button?.text"
          :size="button?.size"
          :type="button?.type"
          :shape="button?.shape"
          :plain="button?.plain"
          :custom-style="button?.customStyle"
          @click="handleClick"
        ></HyButton>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-empty",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit } from "../../utils";
import emptyIcon from "./icon";
import type { HyButtonProps } from "../hy-button/typing";
import type { IEmptyEmits } from "./typing";
// 组件
import HyButton from "../hy-button/hy-button.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 加载的第一页数据就为空
 * @displayName hy-empty
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 是否显示空状态 */
  show: {
    type: Boolean,
    default: true,
    required: true,
  },
  /** 缺省页内容 */
  mode: {
    type: String,
    default: "car",
  },
  /** 空状态图片 */
  imageUrl: String,
  /** 组件层级 */
  zIndex: {
    type: Number,
    default: 889,
  },
  /** 组件层级 */
  width: {
    type: Number,
    default: 350,
  },
  /** icon高度 */
  height: {
    type: [String, Number],
    default: "auto",
  },
  /** 提示信息 */
  description: String,
  /** 提示信息大小 */
  desSize: {
    type: Number,
    default: 15,
  },
  /** 提示信息颜色 */
  desColor: String,
  /** 图片margin */
  imgMargin: String,
  /** 按钮属性值 */
  button: {
    type: Object as unknown as PropType<HyButtonProps>,
  },
  navigateUrl: String,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IEmptyEmits>();

const emptyDescription = computed(() => {
  return props.description;
});

/**
 * @description 整体样式
 * */
const emptyStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    zIndex: props.zIndex,
  };
  return Object.assign(style, props.customStyle);
});

/**
 * @description 提示信息样式
 * */
const descriptionStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    fontSize: addUnit(props.desSize),
    color: props.desColor,
  };
  return style;
});

/**
 * @description 图片样式
 * */
const imgStyle = computed<CSSProperties>(() => {
  return {
    width: addUnit(props.width),
    height: addUnit(props.height),
    margin: props.imgMargin,
  };
});

/**
 * @description 点击按钮，跳转页面
 * */
const handleClick = () => {
  emit("click");
  if (props.navigateUrl) {
    uni.navigateTo({
      url: props.navigateUrl,
    });
  }
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
