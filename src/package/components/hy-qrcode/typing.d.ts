export interface IQrcodeEmits {
    /** 二维码生成成功 */
    result: [res: any]
    /** 打开图片事件 */
    preview: [res: string, event: Event]
    /** 长按事件 */
    longPress: []
}
