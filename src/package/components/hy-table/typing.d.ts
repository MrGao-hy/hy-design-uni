import type { RowCenterType } from '../../libs'
export interface ITableColumn {
    /** 列标题 */
    title: string
    /** 对应数据字段名 */
    key: string
    /** 列宽 (数字默认 px) */
    width?: number
    /** 对齐方式 */
    align?: RowCenterType
    /** 是否开启排序 */
    sortable?: boolean
    /** 是否开启文本超长省略 */
    ellipsis?: boolean
    /** 开启省略后，是否开启点击显示完整内容(Tooltip) */
    tooltip?: boolean
    /** 是否固定 ('left' | 'right') */
    fixed?: 'left' | 'right'
    /** 处理数据函数 */
    formatter?: (value: any, row: any) => string
}

export type SortType = 'asc' | 'desc' | 'normal'

export interface ITableEmits {
    /** 当某一行被点击时会触发该事件 */
    'row-click': [row: any, index: number]
    /** 触发本地排序或远程排序事件 */
    'sort-change': [key: string, sort: SortType]
}

export interface ITableSlots {
    /** 左边头部插槽 */
    'left-head': (props: { col: ITableColumn }) => any
    /** 左边头部插槽 */
    head: (props: { col: ITableColumn }) => any
    /** 左边头部插槽 */
    'right-head': (props: { col: ITableColumn }) => any
    /** 左边插槽 */
    left: (props: { row: unknown; col: ITableColumn; index: number }) => any
    /** 默认插槽 */
    default: (props: {
        row: { [key: ITableColumn['key']]: any }
        col: ITableColumn
        index: number
    }) => any
    /** 右边插槽 */
    right: (props: { row: Record<string, any>; col: ITableColumn; index: number }) => any
    /** 空状态 */
    empty: () => any
}
