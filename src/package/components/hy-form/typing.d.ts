import type { ExtractPropTypes } from 'vue'
import type formProps from './props'

export interface HyFormProps extends ExtractPropTypes<typeof formProps> {}
export type HyFormSimpleProps = HyFormProps

export interface FormRule {
    /**
     * 是否必填
     */
    required?: boolean
    /**
     * 验证失败时的提示信息
     */
    message?: string
    /**
     * 自定义验证函数
     */
    validator?: (value: any) => boolean | string
    /**
     * 触发验证的时机
     */
    trigger?: ('blur' | 'change')[]
    /**
     * 最小长度
     */
    min?: number
    /**
     * 最大长度
     */
    max?: number
    /**
     * 验证类型
     */
    type?: 'phone' | 'email' | 'password'
}

export interface FormItemRule {
    [key: string]: FormRule | FormRule[]
}

export interface IFormEmits {
    /** 提交表单 */
    (e: 'submit', data: FormRule): void
    /** 表单校验 */
    (e: 'validate', valid: boolean, errors: AnyObject): void
}

/** HyForm 组件实例暴露的方法和属性 */
export interface IFormExpose {
    /**
     * 验证所有表单字段
     * @returns Promise，验证成功时 resolve，失败时 reject 并返回错误信息
     */
    validate: () => Promise<unknown>
    /**
     * 重置表单所有字段到初始值
     */
    resetFields: () => void
    /**
     * 清除表单验证错误
     * @param fields 可选，指定要清除的字段名数组，不传则清除所有
     */
    clearValidate: (fields?: string[]) => void
    /**
     * 提交表单（会先执行验证）
     * @returns Promise，验证成功时返回表单数据，失败时返回 false
     */
    submit: () => Promise<AnyObject | false>
    /**
     * 表单数据对象
     */
    formData: AnyObject
    /**
     * 表单错误信息
     */
    errors: Record<string, string>
}
