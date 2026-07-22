/**
 * 模式类型
 *
 * 用于控制组件的展示形式。
 *
 * @values
 * button-按钮模式
 * subsection-分段模式
 */
export type SubsectionModeType = 'button' | 'subsection'

export type SubSectionCustomKeys = {
    name: string
    value: string
}
type CustomKeyField = SubSectionCustomKeys['name'] | SubSectionCustomKeys['value']

export interface SubSectionItemVo {
    name?: string
    value?: string | number
    [key: CustomKeyField]: string | number
}

export type SubSectionVo = string | number | SubSectionItemVo

export interface ISubsectionEmits {
    /** 改变触发 */
    change: [index: number]
    /** 改变触发 */
    'update:modelValue': [value: any]
}
