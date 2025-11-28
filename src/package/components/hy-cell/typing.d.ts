export interface ICellEmits {
    /** 点击单元格触发 */
    (e: 'click', name: string | number): void
}
