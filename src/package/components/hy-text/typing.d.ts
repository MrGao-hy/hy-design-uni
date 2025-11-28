export type TextMode = 'text' | 'price' | 'phone' | 'name' | 'date' | 'link'

export interface ITextEmits {
    /** 点击触发 */
    (e: 'click', event: any): void
}
