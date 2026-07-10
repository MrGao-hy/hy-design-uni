export interface CascaderOption {
    value: string | number
    label: string
    children?: CascaderOption[]
    disabled?: boolean
    isLeaf?: boolean
    [key: string]: any
}

export interface CascaderValue {
    value: (string | number)[]
    label: string[]
}

export interface CascaderEmitValue {
    value: (string | number)[]
    label: string[]
    selectedOptions: CascaderOption[]
}

export type CascaderLazyLoad = (
    option: CascaderOption | null,
    tabIndex: number,
    resolve: (children: CascaderOption[]) => void
) => void

export interface ICascaderEmits {
    close: []
    cancel: []
    confirm: [params: CascaderEmitValue]
    change: [params: CascaderEmitValue]
    'update:show': [show: boolean]
    'update:modelValue': [value: CascaderValue]
}
