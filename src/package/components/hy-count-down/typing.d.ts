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
