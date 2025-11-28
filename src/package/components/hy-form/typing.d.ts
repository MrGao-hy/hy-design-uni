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
