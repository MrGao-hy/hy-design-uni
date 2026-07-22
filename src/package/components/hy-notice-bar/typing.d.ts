export type NoticeBarModeType = 'closable' | 'link' | ''

/**
 * 页面跳转类型
 *
 * 用于控制页面导航方式。
 *
 * @values
 * navigateTo-保留当前页面，跳转到应用内页面
 * redirectTo 关闭当前页面，跳转到应用内页面
 * switchTab-跳转到 TabBar 页面
 * reLaunch-关闭所有页面，打开目标页面
 */
export type LinkType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch'

export interface INoticeBarEmits {
    /** 点击执行函数 */
    click: [index: number]
    /** 关闭组件执行函数 */
    close: []
}
