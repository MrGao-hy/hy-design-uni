export interface CheckboxColumnsVo extends FieldNamesType {
    /**
     * @description 显示文本内容
     * */
    label?: string
    /**
     * @description 值
     * */
    value?: string | number
    /**
     * @description 是否选中
     * */
    checked?: boolean

    /**
     * @description 是否禁用
     * */
    disabled?: boolean
}
export interface IFieldNames {
    /**
     * @description 自定义columns的文本键
     * */
    label: string
    /**
     * @description 自定义columns的值键
     * */
    value: string
    /**
     * @description 自定义columns的选中键
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
