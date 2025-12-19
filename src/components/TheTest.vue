<script setup lang="ts">
import { computed, ref } from 'vue'
import { type FormColumnsType, FormTypeEnum, type RulesVo } from 'hy-app'
import HyForm from '@/package/components/hy-form/hy-form.vue'
import HyFormItem from '@/package/components/hy-form-item/hy-form-item.vue'
import HyInput from '@/package/components/hy-input/hy-input.vue'
import HyRadio from '@/package/components/hy-radio/hy-radio.vue'
import HyTextarea from '@/package/components/hy-textarea/hy-textarea.vue'
import HyPicker from '@/package/components/hy-picker/hy-picker.vue'

interface IColumns extends FormColumnsType {
    /**
     * 是否需要单个校验
     * */
    valid?: boolean
}

interface IProps {
    columns: IColumns[]
    formData: AnyObject
    rules?: RulesVo | RulesVo[]
    labelWidth?: number | string
    border?: 'none' | 'round' | 'bottom'
}

const props = withDefaults(defineProps<IProps>(), {})
const formRef = ref()
const itemRef = ref()
const showPassword = ref(false)
const isInput = computed(() => {
    return (temp: string) => {
        return [FormTypeEnum.TEXT, FormTypeEnum.PASSWORD, FormTypeEnum.NUMBER, 'digit'].includes(
            temp
        )
    }
})

/**
 * 验证表单
 * */
const validate = () => {
    return new Promise((resolve, reject) => {
        formRef.value
            .validate()
            .then((isValid: boolean) => resolve(isValid))
            .catch((allErrors: AnyObject) => reject(allErrors))
    })
}

defineExpose({
    validate,
    formRef,
    itemRef
})
</script>

<template>
    <hy-form ref="formRef" :model="formData" :label-width="labelWidth" :rules="rules">
        <hy-form-item
            v-for="item in columns"
            :key="item.field"
            :label="item.label"
            :prop="item.field"
            :ref="item.valid ? 'itemRef' : ''"
        >
            <template v-if="isInput(item.type)">
                <hy-input
                    v-model="formData[item.field]"
                    :prefix-icon="item.input.prefixIcon"
                    :suffix-icon="item.input.suffixIcon"
                    type="text"
                    :placeholder="item.input.placeholder"
                    :border="border"
                    clearable
                    :password="item.type === 'password' && !showPassword"
                    :custom-style="item.input.customStyle"
                    :custom-class="item.input.customClass"
                ></hy-input>
            </template>

            <template v-if="item.type === 'textarea'">
                <hy-textarea
                    v-model="formData[item.field]"
                    :placeholder="item.textarea.placeholder"
                    :border="border"
                    clearable
                >
                </hy-textarea>
            </template>

            <template v-if="item.type === FormTypeEnum.RADIO">
                <hy-radio
                    v-model="formData[item.field]"
                    :columns="item.actions"
                    size="small"
                ></hy-radio>
            </template>

            <template v-if="item.type === FormTypeEnum.SELECT">
                <hy-picker
                    v-model="formData[item.field]"
                    has-input
                    :columns="item.select"
                    closeOnClickOverlay
                    :input="item.input"
                ></hy-picker>
            </template>

            <template v-if="item.type === FormTypeEnum.DETAIL">
                <text>{{ formData[item.field] }}</text>
            </template>

            <template v-if="item.type === FormTypeEnum.CUSTOM">
                <slot name="custom"></slot>
            </template>
        </hy-form-item>
    </hy-form>
</template>

<style lang="scss" scoped></style>
