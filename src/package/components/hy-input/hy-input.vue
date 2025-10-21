<template>
  <view
    :class="['hy-input', inputClass]"
    :style="[wrapperStyle, borderStyle(focused)]"
  >
    <view class="hy-input__content">
      <view
        class="hy-input__content--prefix-icon"
        v-if="prefixIcon?.name || $slots.prefix"
        @tap.stop="onPrefix"
      >
        <slot v-if="$slots.prefix" name="prefix"></slot>
        <HyIcon
          v-else
          :name="prefixIcon?.name"
          :size="prefixIcon?.size"
          :color="prefixIcon?.color"
          :bold="prefixIcon?.bold"
          :customPrefix="prefixIcon?.customPrefix"
          :imgMode="prefixIcon?.imgMode"
          :width="prefixIcon?.width"
          :height="prefixIcon?.height"
          :top="prefixIcon?.top"
          :stop="prefixIcon?.stop"
          :round="prefixIcon?.round"
          :customStyle="prefixIcon?.customStyle"
        ></HyIcon>
      </view>
      <view class="hy-input__content--field-wrapper" @tap="clickHandler">
        <!-- 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时
					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined
				 -->
        <input
          ref="input-native"
          class="hy-input__content--field-wrapper__field"
          :style="[inputStyle]"
          :type="type"
          :focus="focus"
          :cursor="cursor"
          :value="String(innerValue)"
          :auto-blur="autoBlur"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder || ''"
          :placeholder-style="formatObject(placeholderStyle)"
          :placeholder-class="placeholderClass"
          :confirm-type="confirmType"
          :confirm-hold="confirmHold"
          :hold-keyboard="holdKeyboard"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjustPosition"
          :selection-end="selectionEnd"
          :selection-start="selectionStart"
          :password="password || type === 'safe-password' || false"
          :ignoreCompositionEvent="ignoreCompositionEvent"
          @input="onInput"
          @blur="onBlur"
          @focus="onFocus"
          @confirm="onConfirm"
          @keyboardheightchange="onkeyboardheightchange"
        />
      </view>
      <view
        class="hy-input__content--clear"
        v-if="isShowClear"
        @tap.stop="onClear"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          size="11"
          color="#ffffff"
          :customStyle="{ lineHeight: '12px' }"
        ></HyIcon>
      </view>
      <view
        class="hy-input__content--subfix-icon"
        v-if="suffixIcon?.name || $slots.suffix"
        @tap.stop="onSuffix"
      >
        <slot v-if="$slots.suffix" name="suffix"></slot>
        <HyIcon
          v-else
          :name="suffixIcon?.name"
          :size="suffixIcon?.size"
          :color="suffixIcon?.color"
          :bold="suffixIcon?.bold"
          :customPrefix="suffixIcon?.customPrefix"
          :imgMode="suffixIcon?.imgMode"
          :width="suffixIcon?.width"
          :height="suffixIcon?.height"
          :top="suffixIcon?.top"
          :stop="suffixIcon?.stop"
          :round="suffixIcon?.round"
          :customStyle="suffixIcon?.customStyle"
        ></HyIcon>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-input",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch, inject } from "vue";
import type { CSSProperties, PropType } from "vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { addUnit, formatObject, sleep } from "../../utils";
import { IconConfig } from "../../config";
import type { IInputEmits } from "./typing";
import type HyIconProps from "../hy-icon/typing";
import type { FormItemContext } from "../hy-form-item/typing";
import type {
  InputConfirmType,
  InputOnBlurEvent,
  InputOnConfirmEvent,
  InputOnFocusEvent,
  InputOnKeyboardheightchange,
  InputType,
} from "@uni-helper/uni-types";

/**
 * 为一个输入框，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
 * @displayName hy-input
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 输入的值 */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /**
   * 输入框类型，见上方说明
   * @values text,idcard,number,digit,safe-password,tel,nickname
   * */
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  /** 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序 */
  fixed: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用输入框 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 禁用状态时的背景色 */
  disabledColor: {
    type: String,
    default: "",
  },
  /** 是否显示清除控件 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 是否密码类型 */
  password: {
    type: Boolean,
    default: false,
  },
  /** 最大输入长度，设置为 -1 的时候不限制最大长度  */
  maxlength: {
    type: Number,
    default: -1,
  },
  /** 输入框为空时的占位符 */
  placeholder: String,
  /** 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ */
  placeholderClass: {
    type: String,
    default: "input-placeholder",
  },
  /** 指定placeholder的样式，字符串/对象形式，如"color: red;" */
  placeholderStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  /** 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效 */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  /** 设置右下角按钮的文字，兼容性详见uni-app文档 */
  confirmType: {
    type: String as PropType<InputConfirmType>,
    default: "done",
  },
  /** 点击键盘右下角按钮时是否保持键盘不收起，H5无效 */
  confirmHold: {
    type: Boolean,
    default: false,
  },
  /** focus时，点击页面的时候不收起键盘，微信小程序有效 */
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  /** 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点 */
  focus: {
    type: Boolean,
    default: false,
  },
  /** 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 */
  autoBlur: {
    type: Boolean,
    default: false,
  },
  /** 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效 */
  disableDefaultPadding: {
    type: Boolean,
    default: false,
  },
  /** 指定focus时光标的位置 */
  cursor: {
    type: Number,
    default: 140,
  },
  /** 输入框聚焦时底部与键盘的距离 */
  cursorSpacing: {
    type: Number,
    default: 30,
  },
  /** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
  selectionStart: {
    type: Number,
    default: -1,
  },
  /** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
  selectionEnd: {
    type: Number,
    default: -1,
  },
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入框内容对齐方式
   * @values left,center,right
   * */
  inputAlign: {
    type: String as PropType<HyApp.RowCenterType>,
    default: "left",
  },
  /** 输入框字体的大小 */
  fontSize: {
    type: [String, Number],
    default: "15px",
  },
  /** 输入框字体颜色 */
  color: {
    type: String,
    default: "",
  },
  /** 输入框前置图标 */
  prefixIcon: {
    type: Object as PropType<HyIconProps>,
    default: () => {},
  },
  /** 输入框后置图标 */
  suffixIcon: {
    type: Object as PropType<HyIconProps>,
    default: () => {},
  },
  /**
   * 边框类型
   * @values surround,bottom,none
   * */
  border: {
    type: String as PropType<HyApp.BorderType>,
    default: "surround",
  },
  /** 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入框形状
   * @values circle,square
   * */
  shape: {
    type: String as PropType<HyApp.ShapeType>,
    default: "square",
  },
  /** 是否忽略组件内对文本合成系统事件的处理 */
  ignoreCompositionEvent: {
    type: Boolean,
    default: false,
  },
  /** 内容式化函数 */
  formatter: Function,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IInputEmits>();
const formItem = inject<FormItemContext | null>("formItem", null);

// 清除操作
const clearInput = ref<boolean>(false);
// 输入框的值
const innerValue = ref<string | number>("");
// 是否处于获得焦点状态
const focused = ref<boolean>(false);
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false);
const innerFormatter = (value: string) => value;

watch(
  () => props.modelValue,
  (newVal) => {
    if (changeFromInner.value || innerValue.value === newVal) {
      changeFromInner.value = false; // 重要否则会出现双向绑定失效问题https://github.com/ijry/uview-plus/issues/419
      return;
    }
    innerValue.value = newVal;
    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
    if (firstChange.value === false && changeFromInner.value === false) {
      valueChange(innerValue.value, true);
    }
    firstChange.value = false;
    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
    changeFromInner.value = false;
  },
  { immediate: true },
);

/**
 * @description 是否显示清除控件
 * */
const isShowClear = computed(() => {
  const { clearable, readonly } = props;
  return clearable && !readonly && innerValue.value !== "";
});
/**
 * @description 组件的类名
 * */
const inputClass = computed((): string => {
  let classes: string[] = [],
    { border, shape } = props;
  border === "surround" &&
    (classes = classes.concat(["hy-border", "hy-input__radius"]));
  classes.push(`hy-input__${shape}`);
  border === "bottom" &&
    (classes = classes.concat(["hy-border__bottom", "hy-input__no-radius"]));
  props.disabled && classes.push("hy-input__disabled");
  return classes.join(" ");
});

/**
 * @description 组件的样式
 * */
const wrapperStyle = computed((): CSSProperties => {
  const style: CSSProperties = {};
  style.paddingTop = "6px";
  style.paddingBottom = "6px";
  style.paddingLeft = "9px";
  style.paddingRight = "9px";
  // 禁用状态下，被背景色加上对应的样式
  if (props.disabled) {
    style.backgroundColor = props.disabledColor;
  }
  return Object.assign(style, props.customStyle);
});
/**
 * @description 输入框的样式
 * */
const inputStyle = computed((): CSSProperties => {
  return {
    color: props.color,
    fontSize: addUnit(props.fontSize),
    textAlign: props.inputAlign,
  };
});

/**
 * @description 边框颜色
 * */
const borderStyle = computed(() => {
  return (isFocus: boolean) => {
    let style: CSSProperties = {};
    if (isFocus) {
      switch (props.border) {
        case "surround":
          style = { border: `1px solid var(--hy-theme-color, #3c9cff)` };
          break;
        case "bottom":
          style = { borderBottom: `1px solid var(--hy-theme-color, #3c9cff)` };
          break;
        default:
          break;
      }
    }
    return style;
  };
});

/**
 * @description 当键盘输入时，触发input事件
 */
const onInput = (e: any) => {
  let { value = "" } = e.detail || {};
  // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
  // console.log('onInput', value, this.innerValue)
  innerValue.value = value;
  nextTick(() => {
    let formatValue = innerFormatter(value);
    innerValue.value = formatValue;
    valueChange(formatValue);
  });
};
/**
 * @description 输入框失去焦点时触发
 * */
const onBlur = async (event: InputOnBlurEvent) => {
  emit("blur", event, event.detail.value);
  if (formItem) formItem.handleBlur(event.detail.value);
  await sleep();
  focused.value = false;
};
/**
 * @description 输入框聚焦时触发
 * */
const onFocus = (e: InputOnFocusEvent) => {
  focused.value = true;
  emit("focus", e);
};

/**
 * @description 点击完成按钮时触发
 * */
const onConfirm = (e: InputOnConfirmEvent) => {
  emit("confirm", e, innerValue.value);
};
/**
 * 键盘高度发生变化的时候触发此事件
 * 兼容性：微信小程序2.7.0+、App 3.1.0+
 * */
const onkeyboardheightchange = (event: InputOnKeyboardheightchange) => {
  emit("keyboardheightchange", event);
};
/**
 * 内容发生变化，进行处理
 */
const valueChange = (value: string | number, isOut = false) => {
  if (clearInput.value) {
    innerValue.value = "";
    clearInput.value = false;
  }
  nextTick(() => {
    if (!isOut || clearInput.value) {
      // 标识value值的变化是由内部引起的
      changeFromInner.value = true;
      emit("change", value);
      if (formItem) formItem.handleChange(value);

      emit("update:modelValue", value);
    }
  });
};
/**
 * @description 点击清除控件
 */
const onClear = () => {
  clearInput.value = true;
  innerValue.value = "";
  nextTick(() => {
    valueChange("");
    emit("clear");
  });
};
/**
 * 在安卓nvue上，事件无法冒泡
 * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
 * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
 */
const clickHandler = () => {
  // 隐藏键盘
  if (props.disabled || props.readonly) {
    uni.hideKeyboard();
  }
};

/**
 * @description 点击前缀
 * */
const onPrefix = () => {
  emit("onPrefix");
};
/**
 * @description 点击后缀
 * */
const onSuffix = () => {
  emit("onSuffix");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
