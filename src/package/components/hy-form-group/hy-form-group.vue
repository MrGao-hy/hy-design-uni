<template>
  <view class="hy-form">
    <view
      :class="['hy-form--item', borderBottom && 'hy-border__bottom']"
      v-for="item in columns"
      :key="item.field"
    >
      <view v-if="item.label" class="hy-form--item__label" :style="labelStyle">
        <text
          v-if="isRequired(item.rules)"
          style="color: red; font-size: 20px; line-height: 10px"
        >
          *
        </text>
        {{ item.label }}
        <text v-if="symbol">：</text>
      </view>
      <view class="hy-form--item__container">
        <view class="hy-form--item__container-content">
          <!--	输入框	-->
          <view class="flex" v-if="isInput(item.type)">
            <HyInput
              v-model="formData[item.field]"
              :type="item.type"
              :disabled="item?.input?.disabled || input?.disabled"
              :disabledColor="
                item?.input?.disabledColor || input?.disabledColor
              "
              :maxlength="item?.input?.maxlength || input?.maxlength"
              :password="item?.input?.password"
              :clearable="item?.input?.clearable || input?.clearable"
              :readonly="item?.input?.readonly || input?.readonly"
              :placeholder="item?.input?.placeholder"
              :placeholderClass="
                item?.input?.placeholderClass || input?.placeholderClass
              "
              :placeholderStyle="
                item?.input?.placeholderStyle || input?.placeholderStyle
              "
              :showWordLimit="
                item?.input?.showWordLimit || input?.showWordLimit
              "
              :confirmType="item?.input?.confirmType || input?.confirmType"
              :confirmHold="item?.input?.confirmHold || input?.confirmHold"
              :holdKeyboard="item?.input?.holdKeyboard || input?.holdKeyboard"
              :focus="item?.input?.focus || input?.focus"
              :autoBlur="item?.input?.autoBlur || input?.autoBlur"
              :selectionStart="
                item?.input?.selectionStart || input?.selectionStart
              "
              :selectionEnd="item?.input?.selectionEnd || input?.selectionEnd"
              :adjustPosition="
                item?.input?.adjustPosition || input?.adjustPosition
              "
              :inputAlign="item?.input?.inputAlign || input?.inputAlign"
              :fontSize="item?.input?.fontSize || input?.fontSize"
              :color="item?.input?.color || input?.color"
              :prefixIcon="item?.input?.prefixIcon || input?.prefixIcon"
              :suffixIcon="item?.input?.suffixIcon || input?.suffixIcon"
              :formatter="item?.input?.formatter || input?.formatter"
              :shape="item?.input?.shape || input?.shape"
              :border="item?.input?.border || input?.border"
              :customStyle="errorStyle(!!errors[item.field])"
              @change="handleChange($event, item)"
              @blur="handleBlur($event, item)"
              @onPrefix="item?.input?.onPrefix"
              @onSuffix="item?.input?.onSuffix"
            ></HyInput>
          </view>
          <!--	输入框	-->

          <!--	上传	-->
          <template v-if="item.type === FormTypeEnum.UPLOAD">
            <HyUpload
              :fileList="formData[item.field]"
              :maxCount="item.maxCount"
              :disabled="item.disabled"
            />
          </template>
          <!--	上传	-->

          <!--	详情	-->
          <template v-if="item.type === FormTypeEnum.DETAIL">
            <view class="detail">
              {{ formData[item.field] }}
            </view>
          </template>
          <!--	详情	-->

          <!--	文本域	-->
          <view class="flex" v-if="item.type === FormTypeEnum.TEXTAREA">
            <HyTextarea
              v-model="formData[item.field]"
              :disabled="item?.textarea?.disabled || textarea?.disabled"
              :maxlength="item?.textarea?.maxlength || textarea?.maxlength"
              :placeholder="item?.textarea?.placeholder"
              :placeholderClass="
                item?.textarea?.placeholderClass || textarea?.placeholderClass
              "
              :placeholderStyle="
                item?.textarea?.placeholderStyle || textarea?.placeholderStyle
              "
              :holdKeyboard="
                item?.textarea?.holdKeyboard || textarea?.holdKeyboard
              "
              :focus="item?.textarea?.focus || textarea?.focus"
              :selectionStart="
                item?.textarea?.selectionStart || textarea?.selectionStart
              "
              :selectionEnd="
                item?.textarea?.selectionEnd || textarea?.selectionEnd
              "
              :adjustPosition="
                item?.textarea?.adjustPosition || textarea?.adjustPosition
              "
              :formatter="item?.textarea?.formatter || textarea?.formatter"
              :border="item?.textarea?.border || textarea?.border"
              :customStyle="errorStyle(!!errors[item.field])"
              :height="textarea?.height || item?.textarea?.height"
              @change="handleChange($event, item)"
              @blur="handleBlur($event, item)"
            ></HyTextarea>
          </view>
          <!--	文本域	-->

          <!--	复选框/单选框	-->
          <template v-if="item.type === FormTypeEnum.CHECK_BUTTON">
            <hy-check-button
              v-model="formData[item.field]"
              :columns="item.actions"
              :type="item?.checkButton?.type || checkButton?.type"
              :shape="item?.checkButton?.shape || checkButton?.shape"
              :size="item?.checkButton?.size || checkButton?.size"
              :col="item?.checkButton?.col || checkButton?.col"
              :gap="item?.checkButton?.gap || checkButton?.gap"
              :fieldNames="
                item?.checkButton?.fieldNames || checkButton?.fieldNames
              "
              :disabled="item?.checkButton?.size || checkButton?.disabled"
              :selectType="
                item?.checkButton?.selectType || checkButton?.selectType
              "
            ></hy-check-button>
          </template>
          <!--	复选框/单选框	-->

          <!--	单选框	-->
          <template v-if="item.type === FormTypeEnum.RADIO">
            <HyRadio
              v-model="formData[item.field]"
              :columns="item.actions"
              :fieldNames="item?.radio?.fieldNames || radio?.fieldNames"
              :shape="item?.radio?.shape || radio?.shape"
              :disabled="item?.radio?.disabled || radio?.disabled"
              :size="item?.radio?.size || radio?.size"
              :activeColor="item?.radio?.activeColor || radio?.activeColor"
              :inactiveColor="
                item?.radio?.inactiveColor || radio?.inactiveColor
              "
              :iconSize="item?.radio?.iconSize || radio?.iconSize"
              :iconColor="item?.radio?.iconColor || radio?.iconColor"
              :labelDisabled="item?.radio?.disabled || radio?.labelDisabled"
              :placement="item?.radio?.placement || radio?.placement"
            ></HyRadio>
          </template>
          <!--	单选框	-->

          <!--	开关	-->
          <template v-if="item.type === FormTypeEnum.SWITCH">
            <HySwitch
              v-model="formData[item.field]"
              :loading="item?.switchItem?.loading || switchItem?.loading"
              :disabled="item?.switchItem?.disabled || switchItem?.disabled"
              :size="item?.switchItem?.size || switchItem?.size"
              :activeColor="
                item?.switchItem?.activeColor || switchItem?.activeColor
              "
              :inactiveColor="
                item?.switchItem?.inactiveColor || switchItem?.inactiveColor
              "
              :activeValue="
                item?.switchItem?.activeValue || switchItem?.activeValue
              "
              :inactiveValue="
                item?.switchItem?.inactiveValue || switchItem?.inactiveValue
              "
              :activeIcon="
                item?.switchItem?.activeIcon || switchItem?.activeIcon
              "
              :inactiveIcon="
                item?.switchItem?.inactiveIcon || switchItem?.inactiveIcon
              "
              :space="item?.switchItem?.space || switchItem?.space"
            ></HySwitch>
          </template>
          <!--	开关	-->

          <!--	自定义选择器	-->
          <template v-if="item.type === FormTypeEnum.SELECT">
            <HyPicker
              v-model="formData[item.field]"
              :columns="item.select"
              has-input
              :separator="item?.picker?.separator || picker?.separator"
              :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
              :cancelText="item?.picker?.cancelText || picker?.cancelText"
              :confirmText="item?.picker?.confirmText || picker?.confirmText"
              :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
              :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
              :visibleItemCount="
                item?.picker?.visibleItemCount || picker?.visibleItemCount
              "
              :closeOnClickOverlay="
                item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
              "
              :title="item?.picker?.title || picker?.title"
              :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
              :customStyle="errorStyle(!!errors[item.field])"
              :input="{
                disabled:
                  item?.picker?.input?.disabled || picker?.input?.disabled,
                placeholder: item.picker?.input?.placeholder,
                shape: item?.picker?.input?.shape || picker?.input?.shape,
                border: item?.picker?.input?.border || picker?.input?.border,
                customStyle: errorStyle(!!errors[item.field]),
              }"
            ></HyPicker>
          </template>
          <!--	自定义选择器	-->

          <!--	时间选择器	-->
          <template v-if="item.type === FormTypeEnum.DATE">
            <HyDatetimePicker
              v-model="formData[item.field]"
              has-input
              :mode="item.mode"
              :separator="item?.picker?.separator || picker?.separator"
              :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
              :cancelText="item?.picker?.cancelText || picker?.cancelText"
              :confirmText="item?.picker?.confirmText || picker?.confirmText"
              :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
              :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
              :visibleItemCount="
                item?.picker?.visibleItemCount || picker?.visibleItemCount
              "
              :closeOnClickOverlay="
                item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
              "
              :title="item?.picker?.title || picker?.title"
              :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
              :customStyle="errorStyle(!!errors[item.field])"
              :input="{
                disabled:
                  item?.picker?.input?.disabled || picker?.input?.disabled,
                placeholder: item.picker?.input?.placeholder,
                shape: item?.picker?.input?.shape || picker?.input?.shape,
                border: item?.picker?.input?.border || picker?.input?.border,
                customStyle: errorStyle(!!errors[item.field]),
              }"
            ></HyDatetimePicker>
          </template>
          <!--	时间选择器	-->

          <!--	地址选择器	-->
          <template v-if="item.type === FormTypeEnum.ADDRESS">
            <HyAddressPicker
              v-model="formData[item.field]"
              has-input
              :separator="item?.picker?.separator || picker?.separator"
              :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
              :cancelText="item?.picker?.cancelText || picker?.cancelText"
              :confirmText="item?.picker?.confirmText || picker?.confirmText"
              :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
              :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
              :visibleItemCount="
                item?.picker?.visibleItemCount || picker?.visibleItemCount
              "
              :closeOnClickOverlay="
                item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
              "
              :title="item?.picker?.title || picker?.title"
              :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
              :customStyle="errorStyle(!!errors[item.field])"
              :input="{
                disabled:
                  item?.picker?.input?.disabled || picker?.input?.disabled,
                placeholder: item.picker?.input?.placeholder,
                shape: item?.picker?.input?.shape || picker?.input?.shape,
                border: item?.picker?.input?.border || picker?.input?.border,
                customStyle: errorStyle(!!errors[item.field]),
              }"
            ></HyAddressPicker>
          </template>
          <!--	地址选择器	-->

          <!--	自定义插槽	-->
          <view class="flex" v-if="item.type === FormTypeEnum.CUSTOM">
            <slot
              :name="item.field"
              :record="item"
              :errorStyle="errorStyle(!!errors[item.field])"
            ></slot>
          </view>
          <!--	自定义插槽	-->
        </view>

        <!--	提示信息	-->
        <HyTransition :show="!!errors[item.field]" mode="slide-left">
          <view class="hy-form--item__container-warning">{{
            errors[item.field]
          }}</view>
        </HyTransition>
        <!--	提示信息	-->
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-form",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, reactive, toRefs } from "vue";
import type { CSSProperties } from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit, error, FormTypeEnum } from "../../libs";
import type { FormColumnsType, RulesVo } from "../../libs/typing";

// 组件
import HyInput from "../hy-input/hy-input.vue";
import HyPicker from "../hy-picker/hy-picker.vue";
import HyUpload from "../hy-upload/hy-upload.vue";
import HyTextarea from "../hy-textarea/hy-textarea.vue";
import HySwitch from "../hy-switch/hy-switch.vue";
import HyRadio from "../hy-radio/hy-radio.vue";
import HyDatetimePicker from "../hy-datetime-picker/hy-datetime-picker.vue";
import HyAddressPicker from "../hy-address-picker/hy-address-picker.vue";
import HyTransition from "../hy-transition/hy-transition.vue";
import HyCheckButton from "../hy-check-button/hy-check-button.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  formData,
  columns,
  labelWidth,
  labelAlign,
  labelPosition,
  borderBottom,
} = toRefs(props);
const emit = defineEmits(["click"]);

const labelPos = labelPosition.value === "top" ? "column" : "row";
const isInput = (type: FormTypeEnum) =>
  type === FormTypeEnum.TEXT ||
  type === FormTypeEnum.NUMBER ||
  type === FormTypeEnum.PASSWORD;

/**
 * @description 错误输入框样式
 * */
const errorStyle = computed(() => {
  return (err: boolean) => {
    const style: CSSProperties = {};
    if (err) {
      style.background = "#dd6161";
    }

    return style;
  };
});

const isRequired = computed(() => {
  return (temp: any) => {
    if (Array.isArray(temp)) {
      return temp.some((item) => item?.required);
    } else {
      return temp?.required;
    }
  };
});

const errors: AnyObject = reactive({});

/**
 * @description 标题行内样式
 * */
const labelStyle = computed(() => {
  return {
    textAlign: labelAlign.value,
    width: addUnit(labelWidth.value),
  };
});

/**
 * @description 错误信息校验
 * */
const errorMsg = (rule: RulesVo, value: string): string => {
  // 手机正则
  const phoneExpression = /^1[3-9]\d{9}$/;
  // 邮箱正则
  const emitExpression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // 复杂密码正则
  const passwordExpression =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (rule.required && !value) {
    return rule.message!;
  } else if (
    (rule?.min || rule?.max) &&
    (value.length < rule?.min! || value.length > rule?.max!)
  ) {
    return rule.message!;
  } else if (rule.type === "phone" && !phoneExpression.test(String(value))) {
    return rule.message || "请输入正确的手机号";
  } else if (rule.type === "email" && !emitExpression.test(String(value))) {
    return rule.message || "请输入正确的邮箱格式";
  } else if (
    rule.type === "password" &&
    !passwordExpression.test(String(value))
  ) {
    return (
      rule.message || "至少8个字符串，并且包含大、小写字母、数字和特殊符号"
    );
  } else if (rule?.validator && !rule.validator(rule, value)) {
    return rule.message || "";
  } else {
    return "";
  }
};

/**
 * @description 校验字段
 * */
const validateField = (
  rules: RulesVo | RulesVo[] | undefined,
  value: string,
  field: string,
  event?: "blur" | "change",
) => {
  if (!rules) return;

  let errorMessage = "";

  if (Array.isArray(rules)) {
    // 遍历所有规则
    for (const index in rules) {
      // 判断是否有change事件或者blur事件
      if (event && !rules[index]?.trigger?.includes(event)) continue;
      errorMessage = errorMsg(rules[index], value);
      if (errorMessage) {
        errors[field] = errorMessage;
        return;
      }
      // 可以继续添加更多规则
    }
  } else {
    // 必填校验
    if (event && !rules?.trigger?.includes(event)) return;
    errorMessage = errorMsg(rules, value);
  }

  // 自定义校验规则
  // if (rules.custom) {
  //   const customError = rules.custom(value);
  //   if (customError) {
  //     errorMessage = customError;
  //   }
  // }

  errors[field] = errorMessage;
};

/**
 * @description 提交表单
 * */
const handleSubmit = () => {
  return new Promise((resolve, reject) => {
    let isValid = true;

    // 校验所有字段
    props.columns.forEach((col) => {
      validateField(col.rules, formData.value[col.field], col.field);
      if (errors[col.field]) {
        isValid = false;
      }
    });

    if (isValid) {
      // alert("表单提交成功！");
      resolve(formData.value);
    } else {
      reject();
      error("表单校验失败，请检查输入！");
    }
  });
};

/**
 * @description 输入值触发
 * */
const handleChange = (event: string, temp: FormColumnsType) => {
  if (isInput(temp.type) && temp?.input?.onChange) {
    temp.input.onChange(event, temp);
  }
  validateField(temp.rules, event, temp.field, "change");
};
/**
 * @description 输入值触发
 * */
const handleBlur = (event: string, temp: FormColumnsType) => {
  if (isInput(temp.type) && temp?.input?.onBlur) {
    temp.input.onBlur(event, temp);
  }
  validateField(temp.rules, event, temp.field, "blur");
};

defineExpose({
  validateField,
  handleSubmit,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-form--item {
  flex-direction: v-bind(labelPos);
}
</style>
