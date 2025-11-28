export type NoticeBarModeVo = 'closable' | 'link' | ''

export interface INoticeBarEmits {
    /** 点击执行函数 */
    (e: 'click', index: number): void
    /** 关闭组件执行函数 */
    (e: 'close'): void
}
