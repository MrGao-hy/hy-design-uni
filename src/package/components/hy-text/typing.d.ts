export type TextMode = 'text' | 'price' | 'phone' | 'name' | 'date' | 'link'

export interface ITextEmits {
    /** 点击触发 */
    click: [event: any]
}
