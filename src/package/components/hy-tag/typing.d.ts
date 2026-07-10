export type TagParamsVo = {
    /** 值 */
    value?: string
    /** 名称 */
    name?: string | number
}

export interface ITagEmits {
    /** 点击标签触发 */
    click: [params: TagParamsVo]
    /** 关闭标签触发 */
    close: [value?: string]
}
