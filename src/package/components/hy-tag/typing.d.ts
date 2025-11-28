export type TagParamsVo = {
    /** 值 */
    value?: string
    /** 名称 */
    name?: string | number
}

export interface ITagEmits {
    /** 点击标签触发 */
    (e: 'click', params: TagParamsVo): void
    /** 关闭标签触发 */
    (e: 'close', value?: string): void
}
