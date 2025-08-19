<template>
  <view class="hy-code-input">
    <view
      :class="itemClass(index)"
      :style="[itemStyle(index)]"
      v-for="(item, index) in codeLength"
      :key="index"
    >
      <view
        class="hy-code-input--item__dot"
        v-if="dot && current > index"
        :style="{ color: color }"
      ></view>
      <text
        v-else
        class="hy-code-input--item__text"
        :style="{
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color: color,
        }"
      >
        {{ codeArray[index] }}
      </text>
    </view>
    <input
      :disabled="disabledKeyboard"
      type="number"
      :focus="focus"
      :value="inputValue"
      :maxlength="maxlength"
      :adjustPosition="adjustPosition"
      class="hy-code-input__input"
      @input="inputHandler"
      :style="{
        height: boxSize,
      }"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-code-input",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { ICodeInputEmits } from "./typing";
import { addUnit, getPx } from "../../utils";
import type { InputOnInputEvent } from "@uni-helper/uni-types";

/**
 * 一般用于验证用户短信验证码的场景，也可以结合华玥的键盘组件使用
 * @displayName hy-code-input
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 获取值 */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /** 最大输入长度 */
  maxlength: {
    type: Number,
    default: 6,
  },
  /** 显示border */
  border: {
    type: Boolean,
    default: true,
  },
  /** 是否用圆点填充 */
  dot: {
    type: Boolean,
    default: false,
  },
  /**
   * 示模式，box-盒子模式，line-底部横线模式
   * @values box,line
   * */
  mode: {
    type: String,
    default: "box",
  },
  /** 是否细边框 */
  hairline: {
    type: Boolean,
    default: false,
  },
  /** 字符间的距离 */
  space: {
    type: Number,
    default: 10,
  },
  /** 是否自动获取焦点 */
  focus: {
    type: Boolean,
    default: false,
  },
  /** 字体是否加粗 */
  bold: {
    type: Boolean,
    default: false,
  },
  /** 字体颜色 */
  color: String,
  /** 字体大小，单位px */
  fontSize: {
    type: [String, Number],
    default: 18,
  },
  /** 输入框的大小，宽等于高 */
  size: {
    type: [String, Number],
    default: 35,
  },
  /** 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true */
  disabledKeyboard: {
    type: Boolean,
    default: false,
  },
  /** 边框和线条颜色 */
  borderColor: String,
  /** 是否禁止输入"."符号  */
  disabledDot: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<ICodeInputEmits>();

const current = ref(0);
const inputValue = ref("");
const isFocus = ref(props.focus);
let timer: ReturnType<typeof setInterval>;
const opacity = ref(1);
const borderWidth = computed(() => (props.hairline ? "0.5px" : "2px"));
const lineHeight = computed(() => (props.hairline ? "2px" : "4px"));
const boxSize = addUnit(props.size);

watch(
  () => props.modelValue,
  (newValue: string | number) => {
    inputValue.value = String(newValue).substring(0, props.maxlength);
    current.value = newValue.toString().length;
  },
  { immediate: true },
);

watch(
  () => isFocus.value,
  (newValue) => {
    // #ifdef APP-NVUE
    if (newValue) {
      timer = setInterval(() => {
        opacity.value = Math.abs(opacity.value - 1);
      }, 600);
    } else {
      clearInterval(timer);
    }
    // #endif
  },
);

onUnmounted(() => {
  // #ifdef APP-NVUE
  clearInterval(timer);
  // #endif
});

// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
const codeLength = computed(() => {
  return new Array(Number(props.maxlength));
});
// 循环item的样式
const itemStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {
      width: boxSize,
      height: boxSize,
    };
    if (props.borderColor) {
      style["--hy-border-color"] = props.borderColor;
    }
    // 盒子模式下，需要额外进行处理
    if (props.mode === "box" && props.border) {
      // 设置盒子的边框，如果是细边框，则设置为1px宽度
      style.borderWidth = borderWidth.value;
      style.borderStyle = "solid";
      style.borderColor = props.borderColor;
      // 如果盒子间距为0的话
      if (getPx(props.space) === 0) {
        // 给第一和最后一个盒子设置圆角
        if (index === 0) {
          style.borderTopLeftRadius = "6px";
          style.borderBottomLeftRadius = "6px";
        }
        if (index === codeLength.value.length - 1) {
          style.borderTopRightRadius = "6px";
          style.borderBottomRightRadius = "6px";
        }
        // 最后一个盒子的右边框需要保留
        if (index !== codeLength.value.length - 1) {
          style.borderRight = "none";
        }
      }
    }
    if (index !== codeLength.value.length - 1) {
      // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
      style.marginRight = addUnit(props.space);
    } else {
      // 最后一个盒子的有边框需要保留
      style.marginRight = 0;
    }

    return style;
  };
});

const itemClass = computed(() => {
  return (index: number) => {
    return [
      "hy-code-input--item",
      props.border
        ? `hy-code-input--item__${props.mode}`
        : "hy-code-input--item__not",
      current.value > index &&
        getPx(props.space) != 0 &&
        props.border &&
        `hy-code-input--item__${props.mode}__border`,
      isFocus.value &&
        current.value === index &&
        getPx(props.space) != 0 &&
        (props.border
          ? `hy-code-input--item__${props.mode}__active`
          : "hy-code-input--item__not__active"),
    ];
  };
});

/**
 * @description 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
 */
const codeArray = computed(() => {
  return String(inputValue.value).split("");
});

/**
 * @description 监听输入框的值发生变化
 * */
const inputHandler = (e: InputOnInputEvent) => {
  const value = e.detail.value;
  inputValue.value = value;
  // 是否允许输入“.”符号
  if (props.disabledDot) {
    nextTick(() => {
      inputValue.value = value.replace(".", "");
    });
  }
  // 未达到maxlength之前，发送change事件，达到后发送finish事件
  emit("change", value);
  // 修改通过v-model双向绑定的值
  emit("update:modelValue", value);
  // 达到用户指定输入长度时，发出完成事件
  if (String(value).length >= Number(props.maxlength)) {
    emit("finish", value);
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";
@include b(code-input) {
  @include m(item) {
    &__box {
      &__active {
        width: v-bind(boxSize);
        height: v-bind(boxSize);
        border-width: v-bind(borderWidth);
      }
    }
    &__line {
      &::after {
        height: v-bind(lineHeight);
        background-color: $hy-border-color;
      }
    }
  }
}
</style>
