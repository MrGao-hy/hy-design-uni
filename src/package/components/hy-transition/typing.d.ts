export interface ITransitionEmits {
    /** 进入中触发 */
    enter: []
    /** 离开中触发 */
    leave: []
    /** 点击触发 */
    click: []
    /** 进入后触发 */
    afterEnter: []
    /** 离开后触发 */
    afterLeave: []
    /** 进入前触发 */
    beforeEnter: []
    /** 离开前触发 */
    beforeLeave: []
}
