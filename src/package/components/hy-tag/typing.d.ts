export type TagParamsVo = {
    /** 值 */
    value?: string | number | boolean
    /** 名称 */
    name?: string
}

export interface ITagEmits {
    /** 点击标签触发 */
    click: [params: TagParamsVo]
    /** 关闭标签触发 */
    close: [value?: string]
}
