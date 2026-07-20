export type TagParamsVo = {
    /** 名称 */
    label?: string
    /** 值 */
    value?: string | number
}

export interface ITagEmits {
    /** 点击标签触发 */
    click: [params: TagParamsVo]
    /** 关闭标签触发 */
    close: [value?: string | number | boolean]
}
