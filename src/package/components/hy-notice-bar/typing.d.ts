export type NoticeBarModeVo = 'closable' | 'link' | ''

export interface INoticeBarEmits {
    /** 点击执行函数 */
    click: [index: number]
    /** 关闭组件执行函数 */
    close: []
}
