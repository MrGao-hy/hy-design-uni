<template>
  <view class="hy-form-item" :class="[`hy-form-item--${labelPosition}`]">
    <view v-if="label" class="hy-form-item__label" :style="labelStyle">
      <text v-if="isRequired" class="hy-form-item__label--required">*</text>
      {{ label }}
    </view>
    <view
      :class="[
        'hy-form-item__content',
        formContext.border && 'hy-border__bottom',
      ]"
    >
      <slot></slot>
    </view>
    <view v-if="errorMessage" class="hy-form-item__error">
      {{ errorMessage }}
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-form-item",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref } from "vue";
import type { PropType } from "vue";
import type { IFormContext } from "./typing";
import { addUnit } from "../../libs";

/**
 * 表单组件子组件，需要搭配hy-form
 * @displayName hy-form-item
 */
defineOptions({});

const props = defineProps({
  /**
   * 标签文本
   */
  label: String,
  /**
   * 表单字段名
   */
  prop: String,
  /**
   * 是否必填
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 验证规则
   */
  rules: Object as PropType<any>,
});

const emit = defineEmits<{
  change: [value: any];
  blur: [value: any];
}>();

// 注入表单上下文
const formContext = inject<IFormContext>("formContext");
const formItem = {
  // 处理子组件事件
  handleChange(value: any) {
    if (props.prop && formContext) {
      formContext.setFieldValue(props.prop, value);
      validate("change");
    }
    emit("change", value);
  },
  handleBlur(value: any) {
    if (props.prop && formContext) {
      validate("blur");
    }
    emit("blur", value);
  },
};
provide("formItem", formItem);

// 当前组件的引用
const formItemRef = ref();

// 错误信息
const errorMessage = computed(() => {
  if (!formContext || !props.prop) return "";
  return formContext.errors[props.prop] || "";
});

// 是否必填
const isRequired = computed(() => {
  if (props.required) return true;
  if (!formContext || !props.prop) return false;

  const fieldRules = formContext.rules?.value?.[props.prop];
  if (!fieldRules) return false;

  const rules = Array.isArray(fieldRules) ? fieldRules : [fieldRules];
  return rules.some((rule) => rule.required);
});

// 标签样式
const labelStyle = computed(() => {
  if (!formContext) return {};

  const style: Record<string, any> = {};

  if (formContext.labelWidth?.value !== "auto") {
    style.width = addUnit(formContext.labelWidth?.value);
  }

  if (formContext.labelAlign?.value) {
    style.textAlign = formContext.labelAlign.value;
  }

  return style;
});

// 标签位置
const labelPosition = computed(() => {
  return formContext?.labelPosition?.value || "left";
});

// 监听表单数据变化
// watch(
//   () => formContext?.formData[props.prop],
//   (newVal) => {
//     if (props.prop && formContext) {
//       formContext.setFieldValue(props.prop, newVal)
//       validate('change')
//     }
//   },
//   { immediate: true },
// )

// 验证字段
const validate = (trigger?: "blur" | "change") => {
  if (!formContext || !props.prop) return true;

  const value = formContext.getFieldValue(props.prop);
  return formContext.validateField(props.prop, value, trigger);
};

// 重置字段
const resetField = () => {
  if (!formContext || !props.prop) return;

  formContext.setFieldValue(props.prop, undefined);
  formContext.validateField(props.prop, undefined);
};

// 清除验证
const clearValidate = () => {
  if (!formContext || !props.prop) return;

  delete formContext.errors[props.prop];
};

// 组件挂载时注册到表单
onMounted(() => {
  if (formContext) {
    formContext.addFormItem({
      props: props,
      validate,
      resetField,
      clearValidate,
    });
  }
});

// 组件卸载时从表单中移除
onUnmounted(() => {
  if (formContext) {
    formContext.removeFormItem({
      props: props,
      validate,
      resetField,
      clearValidate,
    });
  }
});

// 暴露方法给父组件
defineExpose({
  validate,
  resetField,
  clearValidate,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
