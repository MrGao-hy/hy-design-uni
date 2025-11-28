export interface ITransitionEmits {
    /** 进入中触发 */
    (e: 'enter'): void
    /** 离开中触发 */
    (e: 'leave'): void
    /** 点击触发 */
    (e: 'click'): void
    /** 进入后触发 */
    (e: 'afterEnter'): void
    /** 离开后触发 */
    (e: 'afterLeave'): void
    /** 进入前触发 */
    (e: 'beforeEnter'): void
    /** 离开前触发 */
    (e: 'beforeLeave'): void
}
