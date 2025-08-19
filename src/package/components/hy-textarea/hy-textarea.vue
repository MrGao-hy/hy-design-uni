<template>
  <View
    :class="['hy-textarea', customClass, textareaClass]"
    :style="[textareaStyle, borderStyle(isFocus)]"
  >
    <Textarea
      class="hy-textarea--field"
      :value="innerValue"
      :style="{ height: autoHeight ? 'auto' : addUnit(height) }"
      :placeholder="placeholder || ''"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderClass"
      :disabled="disabled"
      :focus="focus"
      :autoHeight="autoHeight"
      :fixed="fixed"
      :cursorSpacing="cursorSpacing"
      :cursor="cursor"
      :showConfirmBar="showConfirmBar"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :disableDefaultPadding="disableDefaultPadding"
      :holdKeyboard="holdKeyboard"
      :maxlength="maxlength"
      :confirm-type="confirmType"
      @focus="onFocus"
      @blur="onBlur"
      @linechange="onLineChange"
      @input="onInput"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    ></Textarea>
    <!-- #ifndef MP-ALIPAY -->
    <Text
      class="hy-textarea--count"
      :style="{
        'background-color': disabled ? 'transparent' : '',
      }"
      v-if="count"
    >
      {{ innerValue.length }}/{{ maxlength }}
    </Text>
    <!-- #endif -->
  </View>
</template>

<script lang="ts">
export default {
  name: "hy-textarea",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, inject } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { ITextareaEmits } from "./typing";
import { addUnit } from "../../utils";
import type { FormItemContext } from "../hy-form-item/typing";
import type {
  InputOnBlurEvent,
  InputOnConfirmEvent,
  InputOnFocusEvent,
  InputOnKeyboardheightchangeEvent,
} from "@uni-helper/uni-types";

/**
 * 用于输入多行文本信息,聊天输入框等。
 * @displayName hy-textarea
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 输入框的内容 */
  modelValue: {
    type: String,
    default: "",
  },
  /** 输入框为空时占位符 */
  placeholder: String,
  /** 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ */
  placeholderClass: {
    type: String,
    default: "textarea-placeholder",
  },
  /** 指定placeholder的样式，对象形式 */
  placeholderStyle: Object as PropType<CSSProperties>,
  /** 输入框高度 */
  height: {
    type: [String, Number],
    default: 70,
  },
  /** 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 */
  confirmType: {
    type: String,
    default: "done",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示统计字数 */
  count: {
    type: Boolean,
    default: false,
  },
  /** 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现 */
  focus: {
    type: Boolean,
    default: false,
  },
  /** 是否自动增加高度 */
  autoHeight: {
    type: Boolean,
    default: false,
  },
  /** 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true */
  fixed: {
    type: Boolean,
    default: false,
  },
  /** 指定光标与键盘的距离 */
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  /** 指定focus时的光标位置 */
  cursor: [String, Number],
  /** 是否显示键盘上方带有”完成“按钮那一栏 */
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  /** 光标起始位置，自动聚焦时有效，需与selection-end搭配使用， */
  selectionStart: {
    type: Number,
    default: -1,
  },
  /** 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 */
  selectionEnd: {
    type: Number,
    default: -1,
  },
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /** 是否去掉 iOS 下的默认内边距，只微信小程序有效 */
  disableDefaultPadding: {
    type: Boolean,
    default: false,
  },
  /** focus时，点击页面的时候不收起键盘，只微信小程序有效 */
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength: {
    type: Number,
    default: 140,
  },
  /**
   * 边框类型
   * @values surround,none,bottom
   * */
  border: {
    type: String,
    default: "surround",
  },
  /** 内容式化函数 */
  formatter: Function,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<ITextareaEmits>();
const formItem = inject<FormItemContext>("formItem");

// 输入框的值
const innerValue = ref<string>("");
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false);
// 是否获取焦点
const isFocus = ref<boolean>(false);
// 过滤处理方法
let innerFormatter = (value: string) => value;

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
    /* #ifdef H5 */
    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
    if (firstChange.value === false && changeFromInner.value === false) {
      valueChange();
    }
    /* #endif */
    firstChange.value = false;
    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
    changeFromInner.value = false;
  },
  { immediate: true },
);

// 组件的类名
const textareaClass = computed(() => {
  let classes: string[] = [];
  props.border === "surround" &&
    (classes = classes.concat(["hy-border", "hy-textarea--radius"]));
  props.border === "bottom" &&
    (classes = classes.concat(["hy-border__bottom", "hy-textarea--no-radius"]));
  props.disabled && classes.push("hy-textarea--disabled");
  return classes.join(" ");
});
// 组件的样式
const textareaStyle = computed(() => {
  const style: CSSProperties = {};

  return Object.assign(style, props.customStyle);
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

const onFocus = (e: InputOnFocusEvent) => {
  isFocus.value = true;
  emit("focus", e);
};
const onBlur = (e: InputOnBlurEvent) => {
  isFocus.value = false;
  emit("blur", e);
  if (formItem) formItem.handleBlur(e.detail.value);
  // 尝试调用u-form的验证方法
  // formValidate(this, "blur");
};
const onLineChange = (e: any) => {
  emit("lineChange", e);
};
const onInput = (e: any) => {
  let { value } = e?.detail;
  // 格式化过滤方法
  const format = props.formatter || innerFormatter;
  const formatValue = format(value);
  // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
  innerValue.value = value;
  nextTick(() => {
    innerValue.value = formatValue;
    valueChange();
  });
};
/**
 * @description 内容发生变化，进行处理
 * */
const valueChange = () => {
  const value = innerValue.value;
  nextTick(() => {
    emit("update:modelValue", value);
    // 标识value值的变化是由内部引起的
    changeFromInner.value = true;
    emit("change", value);
    if (formItem) formItem.handleChange(value);
  });
};
const onConfirm = (e: InputOnConfirmEvent) => {
  emit("confirm", e);
};
const onKeyboardheightchange = (e: InputOnKeyboardheightchangeEvent) => {
  emit("keyboardheightchange", e);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
