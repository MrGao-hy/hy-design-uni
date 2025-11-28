export interface IReadMoreEmits {
    /** 打开触发 */
    (e: 'open', name: string): void
    /** 关闭触发 */
    (e: 'close', name: string): void
}
