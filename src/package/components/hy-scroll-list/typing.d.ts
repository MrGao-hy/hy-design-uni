export interface IScrollListEmits {
    /** 滑动到左边时触发 */
    (e: 'scrollLeft'): void
    /** 滑动到右边时触发 */
    (e: 'scrollRight'): void
}
