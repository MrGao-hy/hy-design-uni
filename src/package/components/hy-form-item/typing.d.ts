import HyFormSimpleProps, { type FormRule } from '../hy-form/typing'
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
    (e: 'change', value: any): void
    /** 表单校验 */
    (e: 'blur', value: any): void
}
