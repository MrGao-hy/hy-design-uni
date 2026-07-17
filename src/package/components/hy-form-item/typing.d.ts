import type { HyFormSimpleProps } from '../../index'
import type { ToRefs } from 'vue'

export interface IFormContext extends ToRefs<HyFormSimpleProps> {
    formData: AnyObject
    errors: Record<string, string>
    addFormItem: (item: any) => void
    removeFormItem: (item: any) => void
    validateField: (field: string, value: any, trigger?: 'blur' | 'change') => boolean
    setFieldValue: (field: string, value: any) => void
    getFieldValue: (field: string) => any
}

/**
 * 表单校验触发类型
 * */
export type FormValidateTrigger = 'blur' | 'change'

export interface FormItemContext {
    /**
     * 失去焦点触发表单校验
     * */
    handleBlur: (value: string | number) => void
    /**
     * 值改变触发表单校验
     * */
    handleChange: (value: string | number) => void
}

export interface IFormItemEmits {
    /** 提交表单 */
    change: [value: any]
    /** 表单校验 */
    blur: [value: any]
}

export interface IFormItemExpose {
    /**
     * 验证所有表单字段
     * @returns Promise，验证成功时 resolve，失败时 reject 并返回错误信息
     */
    validate: (trigger: FormValidateTrigger) => boolean
    /**
     * 重置表单所有字段到初始值
     */
    resetField: () => void
    /**
     * 清除表单验证错误
     * @param fields 可选，指定要清除的字段名数组，不传则清除所有
     */
    clearValidate: () => void
}
