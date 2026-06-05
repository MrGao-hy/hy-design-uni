import type { ExtractPropTypes } from 'vue'
import type checkButtonProps from './props'

export interface HyCheckButtonProps extends ExtractPropTypes<typeof checkButtonProps> {}

export interface CheckboxColumnsVo extends FieldNamesType {
    /**
     * 显示文本内容
     * */
    label?: string
    /**
     * 值
     * */
    value?: string | number
    /**
     * 是否选中
     * */
    checked?: boolean

    /**
     * 是否禁用
     * */
    disabled?: boolean
}
export interface IFieldNames {
    /**
     * 自定义columns的文本键
     * */
    label: string
    /**
     * 自定义columns的值键
     * */
    value: string
    /**
     * 自定义columns的选中键
     * */
    checked: string
}

export type FieldNamesType = {
    [key in keyof IFieldNames as IFieldNames[key]]?: string | number | boolean
}

export interface ICheckButtonEmits {
    /** 选择触发 */
    (e: 'change', value: any): void
    /** 更新值触发 */
    (e: 'update:modelValue', value: any): void
}
