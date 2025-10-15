<template>
  <view class="hy-checkbox--group" :class="bemClass">
    <template v-for="(item, i) in columns_1" :key="i">
      <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler($event, item)"
        :style="checkboxStyle"
        :class="[
          `hy-checkbox--label__${iconPlacement}`,
          borderBottom && placement === 'column' && 'hy-border__bottom',
        ]"
      >
        <view
          class="hy-checkbox--icon-wrap cursor-pointer"
          @tap.stop="iconClickHandler($event, item)"
          :class="iconClasses(item)"
          :style="iconWrapStyle(item)"
        >
          <slot
            name="icon"
            :iconColor="iconColor"
            :iconSize="addUnit(iconSize)"
          >
            <HyIcon
              class="hy-checkbox--icon-wrap__icon"
              :name="IconConfig.CHECK_MASK"
              :size="addUnit(sizeType[size] ?? iconSize)"
              :color="iconColor || '#ffffff'"
            />
          </slot>
        </view>
        <view
          :class="[
            'hy-checkbox--label__wrap',
            'cursor-pointer',
            disabled && 'hy-checkbox--label__wrap--disabled',
          ]"
          @tap.stop="labelClickHandler($event, item)"
        >
          <slot name="label" :record="item">
            <text
              :style="{
                color: labelColor,
                fontSize: addUnit(sizeType[size] ?? labelSize),
              }"
            >
              {{ item[fieldNames.label] }}
            </text>
          </slot>
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-checkbox",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, toRefs, watch, ref, reactive } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit, bem, error } from "../../utils";
import { IconConfig } from "../../config";
import type { ICheckBoxEmits } from "./typing";
import type { CheckboxColumnsVo, IFieldNames } from "../hy-check-button/typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @displayName hy-checkbox
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 双向绑定值，数组类型 */
  modelValue: {
    type: [Boolean, Array<string | number>],
    required: true,
  },
  /** 选择列表数据 */
  columns: {
    type: Array as unknown as PropType<Array<CheckboxColumnsVo>>,
    default: [],
    required: true,
  },
  /** 自定义接收columns的键 */
  fieldNames: {
    type: Object as unknown as PropType<IFieldNames>,
    default: {
      label: "label",
      value: "value",
      checked: "checked",
    },
  },
  /**
   * 标签的大小
   * @values small,medium,large
   * */
  size: {
    type: String,
    default: "medium",
  },
  /**
   * 标签的形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: "square",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 选中状态下的颜色 */
  activeColor: String,
  /** 未选中的颜色 */
  inactiveColor: {
    type: String,
    default: "#c8c9cc",
  },
  /** 图标的大小，单位px */
  iconSize: {
    type: [String, Number],
    default: "20",
  },
  /** 图标颜色 */
  iconColor: String,
  /**
   * 勾选图标的对齐方式
   * @values left,right
   * */
  iconPlacement: {
    type: String,
    default: "left",
  },
  /** 竖向配列时，是否显示下划线 */
  borderBottom: {
    type: Boolean,
    default: false,
  },
  /** label的字体大小，px单位 */
  labelSize: [String, Number],
  /** label的颜色 */
  labelColor: String,
  /** 是否禁止点击提示语选中复选框 */
  labelDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 排列方式
   * @values row,column
   * */
  placement: {
    type: String,
    default: "row",
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<ICheckBoxEmits>();

const columns_1 = ref();
const sizeType: AnyObject = reactive({
  small: 14,
  medium: 18,
  large: 22,
});

watch(
  () => props.modelValue,
  (newValue: boolean | (string | number)[]) => {
    // 判断数组长度为1可以传true/false
    if (props.columns?.length === 1 && typeof newValue === "boolean") {
      props.columns[0][props.fieldNames.checked] = newValue;
      columns_1.value = props.columns;
    } else if (Array.isArray(newValue)) {
      columns_1.value = props.columns.map((item) => {
        item[props.fieldNames.checked] = newValue.includes(
          item[props.fieldNames.value] as string,
        );
        return item;
      });
    } else {
      error("传入值不是数组，请传数组值");
    }
  },
  { immediate: true },
);

const isDisabled = (disabledVal?: boolean): boolean =>
  props.disabled || !!disabledVal;

const checkboxStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.borderBottom && props.placement === "row") {
    error(
      "检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效",
    );
  }
  // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
  if (props.borderBottom && props.placement === "column") {
    style.paddingBottom = "8px";
  }
  return Object.assign(style, props.customStyle);
});
const bemClass = computed(() => {
  return bem("checkbox-group", props, ["placement"]);
});

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
  return (temp: CheckboxColumnsVo): string[] => {
    let classes: string[] = [];
    // 组件的形状
    classes.push("hy-checkbox--icon-wrap--" + props.shape);
    if (isDisabled(temp?.disabled)) {
      classes.push("hy-checkbox--icon-wrap--disabled");
    }
    if (temp[props.fieldNames.checked]) {
      classes.push("hy-checkbox--icon-wrap--checked");
      if (isDisabled(temp?.disabled)) {
        classes.push("hy-checkbox--icon-wrap--disabled--checked");
      }
    }
    return classes;
  };
});

/**
 * @description 定义icon的样式
 * */
const iconWrapStyle = computed(() => {
  return (temp: CheckboxColumnsVo): CSSProperties => {
    // checkbox的整体样式
    const style: CSSProperties = {};
    style.backgroundColor =
      temp[props.fieldNames.checked] && !isDisabled(temp?.disabled)
        ? props.activeColor
        : !isDisabled(temp?.disabled)
          ? "#ffffff"
          : "";
    style.borderColor =
      temp[props.fieldNames.checked] && !isDisabled(temp?.disabled)
        ? props.activeColor
        : props.inactiveColor;
    style.width = addUnit(sizeType[props.size] ?? props.size);
    style.height = addUnit(sizeType[props.size] ?? props.size);
    return style;
  };
});

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled)) {
    setRadioCheckedStatus(temp);
  }
};
/**
 * @description 点击整行
 * */
const wrapperClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (props.labelDisabled || isDisabled(temp?.disabled)) return;
  setRadioCheckedStatus(temp);
};
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (props.labelDisabled || isDisabled(temp?.disabled)) return;
  setRadioCheckedStatus(temp);
};

/**
 * @description 执行函数改变状态传给父值
 * */
const setRadioCheckedStatus = (temp: CheckboxColumnsVo) => {
  // 将本组件标记为与原来相反的状态
  columns_1.value = columns_1.value.map((item: CheckboxColumnsVo) => {
    if (temp[props.fieldNames.value] === item[props.fieldNames.value]) {
      item[props.fieldNames.checked] = !item[props.fieldNames.checked];
    }
    return item;
  });
  emit(
    "update:modelValue",
    columns_1.value.length === 1
      ? columns_1.value[0].checked
      : columns_1.value
          .filter((item: CheckboxColumnsVo) => item[props.fieldNames.checked])
          .map((item: CheckboxColumnsVo) => item[props.fieldNames.value]),
  );
  emit("change", temp);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
