export interface IQrcodeEmits {
    /** 二维码生成成功 */
    (e: 'result', res: any): void
    /** 打开图片事件 */
    (e: 'preview', res: string, event: Event): void
    /** 长按事件 */
    (e: 'longPress'): void
}
