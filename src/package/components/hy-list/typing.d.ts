export interface IListEmits {
    /** 点击行触发 */
    (e: 'click', temp: string | AnyObject): void
    /** 滚动底部触发 */
    (e: 'scrollToLower'): void
}
