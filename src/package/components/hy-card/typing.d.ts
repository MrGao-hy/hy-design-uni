type IndexVo = string | number | undefined

export interface ICardEmits {
    /** 整个卡片任意位置被点击时触发 */
    click: [index: IndexVo]
    /** 卡片头部被点击时触发 */
    'head-click': [index: IndexVo]
    /** 卡片主体部分被点击时触发 */
    'body-click': [index: IndexVo]
    /** 卡片底部部分被点击时触发 */
    'foot-click': [index: IndexVo]
}
