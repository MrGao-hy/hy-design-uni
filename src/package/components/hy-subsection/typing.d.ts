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
