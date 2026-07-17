export interface IListEmits {
    /** 点击行触发 */
    click: [temp: unknown]
    /** 滚动底部触发 */
    scrollToLower: []
}

export interface IListExpose {
    scrollToIndex: (index: number, offset?: number) => Promise<void>
    scrollToTop: () => Promise<void>
    refreshHeightCache: () => void
}

export interface IListSlots {
    // 默认插槽：整行接管渲染，传入单行/瀑布流数组
    default: (props: { record: Record<string, any>[] | Record<string, any> }) => any
    // 单列内容插槽：单项数据
    content: (props: { record: Record<string, any> }) => any
    // 双列左右单项插槽
    left: (props: { record: Record<string, any> }) => any
    right: (props: { record: Record<string, any> }) => any
    // 双列整列插槽（批量数组）
    'left-list': (props: { record: Record<string, any>[] }) => any
    'right-list': (props: { record: Record<string, any>[] }) => any
    footer: () => any
}
