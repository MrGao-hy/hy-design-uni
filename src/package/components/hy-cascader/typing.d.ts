export interface CascaderOption {
    value?: string | number
    label?: string
    children?: CascaderOption[]
    disabled?: boolean
    isLeaf?: boolean
    [key: string]: any | CascaderOption[]
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
    /** 关闭弹窗时触发 */
    close: []
    /** 取消选择时触发（点击取消按钮、关闭图标或遮罩） */
    cancel: []
    /** 确认选择时触发（选中叶子节点） */
    confirm: [params: CascaderEmitValue]
    /** 选择项变化时触发 */
    change: [params: CascaderEmitValue]
    /** 更新弹窗显示状态 */
    'update:show': [show: boolean]
    /** 更新选中值 */
    'update:modelValue': [value: CascaderValue]
}
