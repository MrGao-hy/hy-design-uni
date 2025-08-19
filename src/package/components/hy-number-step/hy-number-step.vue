<template>
  <view class="hy-number-box">
    <!-- 减号 -->
    <view
      v-if="showMinus && !hideMinus && $slots.minus"
      class="hy-number-box__slot cursor-pointer"
      @tap.stop="clickHandler('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend.stop="onClearTimeout"
    >
      <slot name="minus" />
    </view>
    <view
      v-else-if="showMinus && !hideMinus"
      @tap.stop="clickHandler('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend.stop="onClearTimeout"
      hover-class="hy-number-box__minus--hover"
      hover-stay-time="150"
      :class="[
        { 'hy-number-box__minus--disabled': isDisabled('minus') },
        'hy-number-box__minus',
        'cursor-pointer',
      ]"
      :style="buttonStyle('minus')"
    >
      <HyIcon
        :name="minusIcon?.name || IconConfig.MINUS"
        :color="isDisabled('minus') ? '#c8c9cc' : minusIcon?.color"
        :size="minusIcon?.size"
        :bold="minusIcon?.bold"
        :customPrefix="minusIcon?.customPrefix"
        :imgMode="minusIcon?.imgMode"
        :width="minusIcon?.width"
        :height="minusIcon?.height"
        :top="minusIcon?.top"
        :stop="minusIcon?.stop"
        :round="minusIcon?.round"
        :customStyle="minusIcon?.customStyle"
      ></HyIcon>
    </view>
    <!-- 减号 -->

    <template v-if="!hideMinus">
      <slot name="input" :record="currentValue">
        <!-- #ifdef MP-WEIXIN -->
        <input
          :disabled="disabledInput || disabled"
          :cursor-spacing="getCursorSpacing"
          :class="[
            {
              'hy-number-box__input--disabled': disabled || disabledInput,
            },
            'hy-number-box__input',
          ]"
          :value="currentValue"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
          type="number"
          :style="[inputStyle]"
        />
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <input
          :disabled="disabledInput || disabled"
          :cursor-spacing="getCursorSpacing"
          :class="[
            {
              'hy-number-box__input--disabled': disabled || disabledInput,
            },
            'hy-number-box__input',
          ]"
          v-model="currentValue"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
          type="number"
          :style="[inputStyle]"
        />
        <!-- #endif -->
      </slot>
    </template>

    <!-- 加号 -->
    <view
      class="hy-number-box__slot cursor-pointer"
      @tap.stop="clickHandler('plus')"
      @touchstart="onTouchStart('plus')"
      v-if="showPlus && $slots.plus"
      @touchend.stop="onClearTimeout"
    >
      <slot name="plus" />
    </view>
    <view
      v-else-if="showPlus"
      @tap.stop="clickHandler('plus')"
      @touchstart="onTouchStart('plus')"
      @touchend.stop="onClearTimeout"
      hover-class="hy-number-box__plus--hover"
      hover-stay-time="150"
      :class="[
        { 'hy-number-box__minus--disabled': isDisabled('plus') },
        'hy-number-box__plus',
        'cursor-pointer',
      ]"
      :style="[buttonStyle('plus')]"
    >
      <HyIcon
        :name="plusIcon?.name || IconConfig.PLUS"
        :color="isDisabled('plus') ? '#c8c9cc' : plusIcon?.color"
        :size="plusIcon?.size"
        :bold="plusIcon?.bold"
        :customPrefix="plusIcon?.customPrefix"
        :imgMode="plusIcon?.imgMode"
        :width="plusIcon?.width"
        :height="plusIcon?.height"
        :top="plusIcon?.top"
        :stop="plusIcon?.stop"
        :round="plusIcon?.round"
        :customStyle="plusIcon?.customStyle"
      ></HyIcon>
    </view>
    <!-- 加号 -->
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-number-step",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit } from "../../utils";
import { IconConfig } from "../../config";
import type HyIconProps from "../hy-icon/typing";
import type { INumberStepEmits } from "./typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import type {
  InputOnBlurEvent,
  InputOnFocusEvent,
  InputOnInputEvent,
} from "@uni-helper/uni-types";

/**
 * 一般用于商城购物选择物品数量的场景
 * @displayName hy-number-step
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 用于双向绑定的值，初始化时设置设为默认min值(最小值) */
  modelValue: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 1,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  /** 加减的步长，可为小数 */
  step: {
    type: Number,
    default: 1,
  },
  /** 是否只允许输入整数 */
  integer: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用，包括输入框，加减按钮 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用输入框 */
  disabledInput: {
    type: Boolean,
    default: false,
  },
  /** 是否开启异步变更，开启后需要手动控制输入值 */
  asyncChange: {
    type: Boolean,
    default: false,
  },
  /** 输入框宽度，单位为px */
  inputWidth: {
    type: [String, Number],
    default: 35,
  },
  /** 是否显示减少按钮 */
  showMinus: {
    type: Boolean,
    default: true,
  },
  /** 是否显示增加按钮 */
  showPlus: {
    type: Boolean,
    default: true,
  },
  /** 显示的小数位数 */
  decimalLength: Number,
  /** 是否开启长按加减手势 */
  longPress: {
    type: Boolean,
    default: true,
  },
  /** 输入框文字和加减按钮图标的颜色 */
  color: String,
  /** 按钮宽度 */
  buttonWidth: {
    type: [String, Number],
    default: 30,
  },
  /** 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致 */
  buttonSize: {
    type: [String, Number],
    default: 30,
  },
  /** 按钮圆角 */
  buttonRadius: [String, Number],
  /** 输入框和按钮的背景颜色 */
  bgColor: String,
  /** 输入框背景颜色 */
  inputBgColor: String,
  /** 指定光标于键盘的距离，避免键盘遮挡输入框，单位px */
  cursorSpacing: {
    type: Number,
    default: 100,
  },
  /** 是否禁用减少按钮 */
  disableMinus: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用增加按钮 */
  disablePlus: {
    type: Boolean,
    default: false,
  },
  /** 减号按钮图标 */
  minusIcon: Object as PropType<HyIconProps>,
  /** 加号按钮图标 */
  plusIcon: Object as PropType<HyIconProps>,
  /** 迷你模式 */
  miniMode: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<INumberStepEmits>();
type StepType = "plus" | "minus";

// 输入框实际操作的值
const currentValue = ref<number>(0);
// 定时器
let longPressTimer: ReturnType<typeof setTimeout> | null = null;

const stepType = ref<StepType>("plus");

/**
 * @description 格式化整理数据，限制范围
 * @param value 处理值
 * */
const format = (value: number | string): number => {
  // 如果为空字符串，那么设置为0，同时将值转为Number类型
  value = !value ? 0 : +value;
  // 对比最大最小值，取在min和max之间的值
  value = Math.max(Math.min(props.max, value), props.min);
  // 如果设定了最大的小数位数，使用toFixed去进行格式化
  if (props.decimalLength !== null) {
    value = parseFloat(value.toFixed(props.decimalLength));
  }
  return value;
};

// 用于监听多个值发生变化
const watchChange = computed(() => {
  return [props.integer, props.decimalLength, props.min, props.max];
});

watch(
  () => watchChange.value,
  () => check(),
);
watch(
  () => props.modelValue,
  (newValue: number) => {
    if (newValue !== currentValue.value) {
      currentValue.value = format(props.modelValue);
    }
  },
  { immediate: true },
);

const hideMinus = computed(() => {
  return currentValue.value == 0 && props.miniMode;
});
const getCursorSpacing = computed(() => {
  // 判断传入的单位，如果为px单位，需要转成px
  return props.cursorSpacing;
});
// 按钮的样式
const buttonStyle = computed(() => {
  return (type: string) => {
    const style: CSSProperties = {
      backgroundColor: props.bgColor,
      width: addUnit(props.buttonWidth),
      height: addUnit(props.buttonSize),
      color: props.color,
      borderRadius: props.buttonRadius,
    };
    return style;
  };
});
// 输入框的样式
const inputStyle = computed<CSSProperties>(() => {
  // const disabled_1 = props.disabled || disabledInput.value;
  return {
    color: props.color,
    backgroundColor: props.inputBgColor || props.bgColor,
    height: addUnit(props.buttonSize),
    width: addUnit(props.inputWidth),
  };
});

const isDisabled = computed(() => {
  return (type: string) => {
    if (type === "plus") {
      // 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
      return (
        props.disabled || props.disablePlus || currentValue.value >= props.max
      );
    }
    // 点击减少按钮同理
    return (
      props.disabled || props.disableMinus || currentValue.value <= props.min
    );
  };
});

onMounted(() => {
  init();
});

const init = () => {
  currentValue.value = format(props.modelValue);
};
const check = () => {
  // 格式化了之后，如果前后的值不相等，那么设置为格式化后的值
  const val = format(currentValue.value);
  if (val != currentValue.value) {
    currentValue.value = val;
    emitChange(val);
  }
};

/**
 * @description 输入框活动焦点
 */
const onFocus = (event: InputOnFocusEvent) => {
  emit("focus", event.detail.value);
};
/**
 * @description 输入框失去焦点
 */
const onBlur = (event: InputOnBlurEvent) => {
  // 对输入值进行格式化
  format(Number(event.detail.value));
  // 发出blur事件
  emit("blur", event.detail.value);
};
/**
 * @description 输入框值发生变化
 */
const onInput = (e: InputOnInputEvent) => {
  const { value = "" } = e.detail || {};
  // 为空返回
  if (value === "") return;
  let formatted = value;
  // https://github.com/ijry/uview-plus/issues/613
  emitChange(value);
  // 最大允许的小数长度
  if (props.decimalLength !== null && formatted.indexOf(".") !== -1) {
    const pair = formatted.split(".");
    formatted = `${pair[0]}.${pair[1].slice(0, props.decimalLength)}`;
  }
  formatted = format(formatted).toString();
  emitChange(formatted);
  // #ifdef MP-WEIXIN
  return formatted;
  // #endif
};
/**
 * @description 发出change事件
 * @param value 值
 */
const emitChange = (value: number | string) => {
  // 如果开启了异步变更值，则不修改内部的值，需要用户手动在外部通过v-model变更
  if (!props.asyncChange) {
    nextTick(() => {
      emit("update:modelValue", value);
      currentValue.value = Number(value);
      // this.$forceUpdate()
    });
  }
  emit("change", value);
};
const onChange = () => {
  if (isDisabled.value(stepType.value)) {
    return emit("overLimit", stepType.value);
  }
  const diff = stepType.value === "minus" ? -props.step : +props.step;
  const value = format(add(+currentValue.value, diff));
  emitChange(value);
  emit(stepType.value, value);
};
/**
 * @description 对值扩大后进行四舍五入，再除以扩大因子，避免出现浮点数操作的精度问题
 * @param num1
 * @param num2
 * */
const add = (num1: number, num2: number) => {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
};
// 点击加减按钮
const clickHandler = (type: StepType) => {
  stepType.value = type;
  onChange();
};
const longPressStep = () => {
  // 每隔一段时间，重新调用longPressStep方法，实现长按加减
  onClearTimeout();
  longPressTimer = setTimeout(() => {
    onChange();
    longPressStep();
  }, 250);
};
const onTouchStart = (type: StepType) => {
  if (!props.longPress) return;
  onClearTimeout();
  stepType.value = type;
  // 一定时间后，默认达到长按状态
  longPressTimer = setTimeout(() => {
    onChange();
    longPressStep();
  }, 600);
};
// 触摸结束，清除定时器，停止长按加减
const onTouchEnd = () => {
  if (!props.longPress) return;
  onClearTimeout();
};
// 清除定时器
const onClearTimeout = () => {
  clearTimeout(longPressTimer as number);
  longPressTimer = null;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
