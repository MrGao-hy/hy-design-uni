export default interface HyCountToProps {
    /**
     * @description 开始的数值，默认从0增长到某一个数（默认 0 ）
     * */
    startVal?: number
    /**
     * @description 要滚动的目标数值，必须 （默认 0 ）
     * */
    endVal: number
    /**
     * @description 滚动到目标数值的动画持续时间，单位为毫秒（ms） （默认
     * */
    duration?: number
    /**
     * @description 设置数值后是否自动开始滚动 （默认 true ）
     * */
    autoplay?: boolean
    /**
     * @description 要显示的小数位数，见官网说明（默认 0 ）
     * */
    decimals?: number
    /**
     * @description 滚动结束时，是否缓动结尾，见官网说明（默认 true ）
     * */
    useEasing?: boolean
    /**
     * @description 十进制分割 （ 默认 "." ）
     * */
    decimal?: string
    /**
     * @description 字体颜色（ 默认 '#606266' )
     * */
    color?: string
    /**
     * @description 字体大小，单位px（ 默认 22 ）
     * */
    fontSize?: number | string
    /**
     * @description 字体是否加粗（默认 false ）
     * */
    bold?: boolean
    /**
     * @description 千位分隔符，见官网说明
     * */
    separator?: string
}

export interface ICountToEmits {
    /** 结束执行函数 */
    (e: 'end'): void
}
