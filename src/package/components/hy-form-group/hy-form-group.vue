<template>
    <hy-form
        ref="hyFormRef"
        :model="formData"
        :rules="extractRules(columns)"
        :label-position="labelPosition"
        :label-align="labelAlign"
        :label-width="labelWidth"
        :border="border"
    >
        <hy-form-item
            v-for="item in columns"
            :key="item.field"
            :label="item.label"
            :prop="item.field"
            :required="item.required"
        >
            <template v-if="isInput(item.type)">
                <hy-input
                    v-model="formData[item.field]"
                    :type="item.type"
                    :disabled="disabled || item?.input?.disabled || input?.disabled"
                    :disabledColor="item?.input?.disabledColor || input?.disabledColor"
                    :maxlength="item?.input?.maxlength || input?.maxlength"
                    :password="item?.input?.password"
                    :clearable="item?.input?.clearable || input?.clearable"
                    :readonly="item?.input?.readonly || input?.readonly"
                    :placeholder="item?.input?.placeholder"
                    :placeholderClass="item?.input?.placeholderClass || input?.placeholderClass"
                    :placeholderStyle="item?.input?.placeholderStyle || input?.placeholderStyle"
                    :showWordLimit="item?.input?.showWordLimit || input?.showWordLimit"
                    :confirmType="item?.input?.confirmType || input?.confirmType"
                    :confirmHold="item?.input?.confirmHold || input?.confirmHold"
                    :holdKeyboard="item?.input?.holdKeyboard || input?.holdKeyboard"
                    :focus="item?.input?.focus || input?.focus"
                    :autoBlur="item?.input?.autoBlur || input?.autoBlur"
                    :selectionStart="item?.input?.selectionStart || input?.selectionStart"
                    :selectionEnd="item?.input?.selectionEnd || input?.selectionEnd"
                    :adjustPosition="item?.input?.adjustPosition || input?.adjustPosition"
                    :inputAlign="item?.input?.inputAlign || input?.inputAlign"
                    :fontSize="item?.input?.fontSize || input?.fontSize"
                    :color="item?.input?.color || input?.color"
                    :prefixIcon="item?.input?.prefixIcon || input?.prefixIcon"
                    :suffixIcon="item?.input?.suffixIcon || input?.suffixIcon"
                    :formatter="item?.input?.formatter || input?.formatter"
                    :shape="item?.input?.shape || input?.shape"
                    :border="item?.input?.border || input?.border"
                    @change="item?.input?.onChange"
                    @blur="item?.input?.onBlur"
                    @onPrefix="item?.input?.onPrefix"
                    @onSuffix="item?.input?.onSuffix"
                ></hy-input>
            </template>

            <!--	上传	-->
            <template v-if="item.type === FormTypeEnum.UPLOAD">
                <hy-upload
                    :fileList="formData[item.field]"
                    :maxCount="item.maxCount"
                    :disabled="disabled || item.disabled"
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
                <hy-textarea
                    v-model="formData[item.field]"
                    :disabled="disabled || item?.textarea?.disabled || textarea?.disabled"
                    :maxlength="item?.textarea?.maxlength || textarea?.maxlength"
                    :placeholder="item?.textarea?.placeholder"
                    :placeholderClass="
                        item?.textarea?.placeholderClass || textarea?.placeholderClass
                    "
                    :placeholderStyle="
                        item?.textarea?.placeholderStyle || textarea?.placeholderStyle
                    "
                    :holdKeyboard="item?.textarea?.holdKeyboard || textarea?.holdKeyboard"
                    :focus="item?.textarea?.focus || textarea?.focus"
                    :selectionStart="item?.textarea?.selectionStart || textarea?.selectionStart"
                    :selectionEnd="item?.textarea?.selectionEnd || textarea?.selectionEnd"
                    :adjustPosition="item?.textarea?.adjustPosition || textarea?.adjustPosition"
                    :formatter="item?.textarea?.formatter || textarea?.formatter"
                    :border="item?.textarea?.border || textarea?.border"
                    :height="textarea?.height || item?.textarea?.height"
                    @change="handleChange($event, item)"
                    @blur="handleBlur($event, item)"
                ></hy-textarea>
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
                    :fieldNames="item?.checkButton?.fieldNames || checkButton?.fieldNames"
                    :disabled="disabled || item?.checkButton?.size || checkButton?.disabled"
                    :selectType="item?.checkButton?.selectType || checkButton?.selectType"
                ></hy-check-button>
            </template>
            <!--	复选框/单选框	-->

            <!--	单选框	-->
            <template v-if="item.type === FormTypeEnum.RADIO">
                <hy-radio
                    v-model="formData[item.field]"
                    :columns="item.actions"
                    :fieldNames="item?.radio?.fieldNames || radio?.fieldNames"
                    :shape="item?.radio?.shape || radio?.shape"
                    :disabled="disabled || item?.radio?.disabled || radio?.disabled"
                    :size="item?.radio?.size || radio?.size"
                    :activeColor="item?.radio?.activeColor || radio?.activeColor"
                    :inactiveColor="item?.radio?.inactiveColor || radio?.inactiveColor"
                    :iconSize="item?.radio?.iconSize || radio?.iconSize"
                    :iconColor="item?.radio?.iconColor || radio?.iconColor"
                    :labelDisabled="item?.radio?.disabled || radio?.labelDisabled"
                    :placement="item?.radio?.placement || radio?.placement"
                ></hy-radio>
            </template>
            <!--	单选框	-->

            <!--	开关	-->
            <template v-if="item.type === FormTypeEnum.SWITCH">
                <hy-switch
                    v-model="formData[item.field]"
                    :loading="item?.switchItem?.loading || switchItem?.loading"
                    :disabled="disabled || item?.switchItem?.disabled || switchItem?.disabled"
                    :size="item?.switchItem?.size || switchItem?.size"
                    :activeColor="item?.switchItem?.activeColor || switchItem?.activeColor"
                    :inactiveColor="item?.switchItem?.inactiveColor || switchItem?.inactiveColor"
                    :activeValue="item?.switchItem?.activeValue || switchItem?.activeValue"
                    :inactiveValue="item?.switchItem?.inactiveValue || switchItem?.inactiveValue"
                    :activeIcon="item?.switchItem?.activeIcon || switchItem?.activeIcon"
                    :inactiveIcon="item?.switchItem?.inactiveIcon || switchItem?.inactiveIcon"
                    :space="item?.switchItem?.space || switchItem?.space"
                ></hy-switch>
            </template>
            <!--	开关	-->

            <!--	自定义选择器	-->
            <template v-if="item.type === FormTypeEnum.SELECT">
                <hy-picker
                    v-model="formData[item.field]"
                    :columns="item.select"
                    has-input
                    :separator="item?.picker?.separator || picker?.separator"
                    :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
                    :cancelText="item?.picker?.cancelText || picker?.cancelText"
                    :confirmText="item?.picker?.confirmText || picker?.confirmText"
                    :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
                    :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
                    :visibleItemCount="item?.picker?.visibleItemCount || picker?.visibleItemCount"
                    :closeOnClickOverlay="
                        item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
                    "
                    :title="item?.picker?.title || picker?.title"
                    :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
                    :input="{
                        disabled:
                            disabled || item?.picker?.input?.disabled || picker?.input?.disabled,
                        placeholder: item.picker?.input?.placeholder,
                        shape: item?.picker?.input?.shape || picker?.input?.shape,
                        border: item?.picker?.input?.border || picker?.input?.border
                    }"
                ></hy-picker>
            </template>
            <!--	自定义选择器	-->

            <!--	时间选择器	-->
            <template v-if="item.type === FormTypeEnum.DATE">
                <hy-datetime-picker
                    v-model="formData[item.field]"
                    has-input
                    :mode="item.mode"
                    :separator="item?.picker?.separator || picker?.separator"
                    :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
                    :cancelText="item?.picker?.cancelText || picker?.cancelText"
                    :confirmText="item?.picker?.confirmText || picker?.confirmText"
                    :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
                    :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
                    :visibleItemCount="item?.picker?.visibleItemCount || picker?.visibleItemCount"
                    :closeOnClickOverlay="
                        item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
                    "
                    :title="item?.picker?.title || picker?.title"
                    :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
                    :input="{
                        disabled:
                            disabled || item?.picker?.input?.disabled || picker?.input?.disabled,
                        placeholder: item.picker?.input?.placeholder,
                        shape: item?.picker?.input?.shape || picker?.input?.shape,
                        border: item?.picker?.input?.border || picker?.input?.border
                    }"
                ></hy-datetime-picker>
            </template>
            <!--	时间选择器	-->

            <!--	地址选择器	-->
            <template v-if="item.type === FormTypeEnum.ADDRESS">
                <hy-address-picker
                    v-model="formData[item.field]"
                    has-input
                    :separator="item?.picker?.separator || picker?.separator"
                    :itemHeight="item?.picker?.itemHeight || picker?.itemHeight"
                    :cancelText="item?.picker?.cancelText || picker?.cancelText"
                    :confirmText="item?.picker?.confirmText || picker?.confirmText"
                    :cancelColor="item?.picker?.cancelColor || picker?.cancelColor"
                    :confirmColor="item?.picker?.confirmColor || picker?.confirmColor"
                    :visibleItemCount="item?.picker?.visibleItemCount || picker?.visibleItemCount"
                    :closeOnClickOverlay="
                        item?.picker?.closeOnClickOverlay || picker?.closeOnClickOverlay
                    "
                    :title="item?.picker?.title || picker?.title"
                    :showToolbar="item?.picker?.showToolbar || picker?.showToolbar"
                    :input="{
                        disabled:
                            disabled || item?.picker?.input?.disabled || picker?.input?.disabled,
                        placeholder: item.picker?.input?.placeholder,
                        shape: item?.picker?.input?.shape || picker?.input?.shape,
                        border: item?.picker?.input?.border || picker?.input?.border
                    }"
                ></hy-address-picker>
            </template>
            <!--	地址选择器	-->

            <!--	自定义插槽	-->
            <view class="flex" v-if="item.type === FormTypeEnum.CUSTOM">
                <slot :name="item.field" :record="item"></slot>
            </view>
            <!--	自定义插槽	-->
        </hy-form-item>
    </hy-form>
</template>

<script lang="ts">
export default {
    name: 'hy-form-group',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import formGroupProps from './props'
import { type FormColumnsType, FormTypeEnum, type RulesVo } from '../../libs'

// 组件
import HyInput from '../hy-input/hy-input.vue'
import HyPicker from '../hy-picker/hy-picker.vue'
import HyUpload from '../hy-upload/hy-upload.vue'
import HyTextarea from '../hy-textarea/hy-textarea.vue'
import HySwitch from '../hy-switch/hy-switch.vue'
import HyRadio from '../hy-radio/hy-radio.vue'
import HyDatetimePicker from '../hy-datetime-picker/hy-datetime-picker.vue'
import HyAddressPicker from '../hy-address-picker/hy-address-picker.vue'
import HyCheckButton from '../hy-check-button/hy-check-button.vue'
import HyForm from '../hy-form/hy-form.vue'
import HyFormItem from '../hy-form-item/hy-form-item.vue'

const props = defineProps(formGroupProps)
const hyFormRef = ref<InstanceType<typeof HyForm> | null>(null)

const isInput = (type: FormTypeEnum) =>
    type === FormTypeEnum.TEXT || type === FormTypeEnum.NUMBER || type === FormTypeEnum.PASSWORD

// 提取规则
function extractRules(formConfig: FormColumnsType[]): Record<string, RulesVo | RulesVo[]> {
    return formConfig.reduce(
        (acc, field) => {
            if (field.rules) {
                acc[field.field] = field.rules
            }
            return acc
        },
        {} as Record<string, RulesVo | RulesVo[]>
    )
}

// 验证表单
const validate = () => {
    return new Promise((resolve, reject) => {
        hyFormRef.value
            .validate()
            .then((isValid: boolean) => resolve(isValid))
            .catch((isValid: boolean) => reject(isValid))
    })
}

// 验证表单
const submit = () => {
    return new Promise((resolve, reject) => {
        hyFormRef.value
            .submit()
            .then((isValid: boolean) => resolve(isValid))
            .catch((allErrors: string[]) => reject(allErrors))
    })
}

// 清楚字段值
const resetFields = () => hyFormRef.value.resetFields()

// 清楚校验
const clearValidate = () => hyFormRef.value.clearValidate()

defineExpose({
    validate,
    resetFields,
    clearValidate,
    submit
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
