type TimeDataVo = {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
}

export interface ICountDownEmits {
    /** 过程中，倒计时变化时触发 */
    (e: 'change', time: TimeDataVo): void
    /** 倒计时结束触发 */
    (e: 'finish'): void
}

/** HyCountDown 组件实例暴露的方法 */
export interface ICountDownExpose {
    /**
     * 重置倒计时
     */
    reset: () => void
    /**
     * 开始倒计时
     */
    start: () => void
    /**
     * 暂停倒计时
     */
    pause: () => void
}
