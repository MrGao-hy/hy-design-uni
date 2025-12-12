export interface ITableColumn {
    /** 列标题 */
    title: string
    /** 对应数据字段名 */
    key: string
    /** 列宽 (数字默认 px) */
    width?: number | string
    /** 对齐方式 */
    align?: HyApp.RowCenterType
    /** 是否开启排序 */
    sortable?: boolean
    /** 是否固定 ('left' | 'right' | false) */
    fixed?: 'left' | 'right' | false
    /** 是否开启文本超长省略 */
    ellipsis?: boolean
    /** 开启省略后，是否开启点击显示完整内容(Tooltip) */
    tooltip?: boolean
}

export type SortType = 'asc' | 'desc' | 'normal'

interface ISortParams {
    key: string
    type: SortType
}

export interface ITableEmits {
    /** 当某一行被点击时会触发该事件 */
    (e: 'row-click', row: any, index: number): void
    /** 单元格点击触发该事件 */
    (e: 'cell-click', row: any, col: ITableColumn): void
    /** 触发本地排序或远程排序事件 */
    (e: 'sort-change', params: ISortParams): void
}
