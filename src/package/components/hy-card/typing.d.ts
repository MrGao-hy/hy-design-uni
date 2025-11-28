type IndexVo = string | number | undefined

export interface ICardEmits {
    /** 整个卡片任意位置被点击时触发 */
    (e: 'click', index: IndexVo): void
    /** 卡片头部被点击时触发 */
    (e: 'head-click', index: IndexVo): void
    /** 卡片主体部分被点击时触发 */
    (e: 'body-click', index: IndexVo): void
    /** 卡片底部部分被点击时触发 */
    (e: 'foot-click', index: IndexVo): void
}
