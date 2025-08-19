<template>
  <view
    :class="['hy-search', customStyle]"
    @tap="clickHandler"
    :style="[
      {
        margin: margin,
      },
      customStyle,
    ]"
  >
    <view
      class="hy-search__content"
      :style="{
        backgroundColor: bgColor,
        borderRadius: shape == 'circle' ? '100px' : '4px',
        borderColor: borderColor,
      }"
    >
      <template v-if="$slots.label || label !== null">
        <slot name="label">
          <text class="hy-search__content__label">{{ label }}</text>
        </slot>
      </template>
      <view class="hy-search__content__icon">
        <HyIcon
          :name="searchIcon?.name || IconConfig.SEARCH"
          :size="searchIcon?.size"
          :color="searchIcon?.color || color"
          :bold="searchIcon?.bold"
          :customPrefix="searchIcon?.customPrefix"
          :imgMode="searchIcon?.imgMode"
          :width="searchIcon?.width"
          :height="searchIcon?.height"
          :top="searchIcon?.top"
          :stop="searchIcon?.stop"
          :round="searchIcon?.round"
          :customStyle="searchIcon?.customStyle"
          @tap="clickIcon"
        ></HyIcon>
      </view>
      <input
        confirm-type="search"
        @blur="blur"
        :value="keyword"
        @confirm="search"
        @input="inputChange"
        :disabled="disabled"
        @focus="getFocus"
        :focus="focus"
        :maxlength="maxlength"
        :adjust-position="adjustPosition"
        :auto-blur="autoBlur"
        placeholder-class="hy-search__content__input--placeholder"
        :placeholder="placeholder"
        :placeholder-style="`color: ${placeholderColor}`"
        class="hy-search__content__input"
        type="text"
        :style="[
          {
            pointerEvents: disabled ? 'none' : 'auto',
            textAlign: inputAlign,
            color: color,
            backgroundColor: bgColor,
            height: addUnit(height),
          },
          inputStyle,
        ]"
      />
      <view
        class="hy-search__content__icon hy-search__content__close"
        v-if="keyword && clear && focused"
        @click="clear"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          size="11"
          color="#ffffff"
          :customStyle="{
            lineHeight: '12px',
          }"
        ></HyIcon>
      </view>
    </view>
    <text
      :style="[actionStyle]"
      class="hy-search__action"
      :class="[(showActionBtn || show) && 'hy-search__action--active']"
      @tap.stop.prevent="confirm"
    >
      {{ actionText }}
    </text>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-search",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import type { PropType, CSSProperties } from "vue";
import type { ISearchEmits } from "./typing";
import { sleep, addUnit } from "../../utils";
import { IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";
import type HyIconProps from "../hy-icon/typing";
import type {
  InputOnBlurEvent,
  InputOnConfirmEvent,
  InputOnFocusEvent,
  InputOnInputEvent,
} from "@uni-helper/uni-types";

/**
 * 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
 * @displayName hy-search
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 输入框初始值 */
  modelValue: {
    type: String,
    default: "",
  },
  /**
   * 搜索框形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: "circle",
  },
  /** 搜索框背景颜色 */
  bgColor: String,
  /** 占位文字内容 */
  placeholder: {
    type: String,
    default: "请输入关键字",
  },
  /** 是否启用清除控件 */
  clear: {
    type: Boolean,
    default: true,
  },
  /** 是否自动获得焦点 */
  focus: {
    type: Boolean,
    default: false,
  },
  /** 是否显示右侧控件 */
  showAction: {
    type: Boolean,
    default: true,
  },
  /** 右侧控件文字 */
  actionText: {
    type: String,
    default: "搜索",
  },
  /** 右侧控件的样式，对象形式 */
  actionStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /** 输入框内容水平对齐方式 */
  inputAlign: {
    type: String,
    default: "left",
  },
  /** 自定义输入框样式，对象形式 */
  inputStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /** 是否启用输入框 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 边框颜色，配置了颜色，才会有边框 */
  borderColor: {
    type: String,
    default: "transparent",
  },
  /** 输入框字体颜色 */
  color: String,
  /** placeholder的颜色 */
  placeholderColor: {
    type: String,
    default: "#909399",
  },
  /** 输入框左边的图标属性集合，可以为图标名称或图片路径 */
  searchIcon: Object as PropType<HyIconProps>,
  /** 组件与其他上下左右之间的距离，带单位的字符串形式，如"30px" */
  margin: {
    type: [String, Number],
    default: 0,
  },
  /** 是否开启动画，见上方说明 */
  animation: {
    type: Boolean,
    default: false,
  },
  /** 输入框最大能输入的长度，-1为不限制长度 */
  maxlength: {
    type: Number,
    default: -1,
  },
  /** 输入框高度，单位px */
  height: {
    type: Number,
    default: 30,
  },
  /** 搜索框左边显示内容 */
  label: String,
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /** 键盘收起时，是否自动失去焦点 */
  autoBlur: {
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
const emit = defineEmits<ISearchEmits>();

const keyword = ref<string>("");
// 显示右边搜索按钮
const show = ref<boolean>(false);
// 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
const focused = ref(props.focus);

watch(
  () => keyword.value,
  (newValue: string) => {
    emit("update:modelValue", newValue);
    emit("change", newValue);
  },
);

watch(
  () => props.modelValue,
  (newValue: string) => {
    keyword.value = newValue;
  },
  { immediate: true },
);

const showActionBtn = computed<boolean>(() => {
  return !props.animation && props.showAction;
});

/**
 * 值改变触发
 * */
const inputChange = (e: InputOnInputEvent) => {
  keyword.value = e.detail.value;
};
/**
 * @description 清空输入
 * */
const clear = () => {
  keyword.value = "";
  // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
  nextTick(() => {
    emit("clear");
  });
};
/**
 * @description 确定搜索
 * */
const search = (e: InputOnConfirmEvent) => {
  emit("search", e, e.detail.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
/**
 * @description 点击右边自定义按钮的事件
 */
const confirm = () => {
  emit("confirm", keyword.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
/**
 * @description 获取焦点
 * */
const getFocus = (e: InputOnFocusEvent) => {
  focused.value = true;
  // 开启右侧搜索按钮展开的动画效果
  if (props.animation && props.showAction) show.value = true;
  emit("focus", e, keyword.value);
};
/**
 * @description 失去焦点
 */
const blur = async (e: InputOnBlurEvent) => {
  // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  show.value = false;
  emit("blur", e, keyword.value);
  await sleep(100);
  focused.value = false;
};
/**
 * @description 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
 * */
const clickHandler = () => {
  if (props.disabled) emit("click");
};
/**
 * @description 点击左边图标
 * */
const clickIcon = () => {
  emit("clickIcon", keyword.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
