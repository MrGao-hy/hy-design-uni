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

export default interface HyFormSimpleProps {
  /**
   * 表单数据对象
   */
  model?: Record<string, any>
  /**
   * 验证规则
   */
  rules?: FormItemRule
  /**
   * 标签宽度
   */
  labelWidth?: string | number
  /**
   * 标签位置
   */
  labelPosition?: 'left' | 'top'
  /**
   * 标签对齐方式
   */
  labelAlign?: 'left' | 'center' | 'right'
  /**
   * 表单列底部边框
   * */
  border: boolean
}
