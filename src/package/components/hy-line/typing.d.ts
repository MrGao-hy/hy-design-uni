import type { CSSProperties } from 'vue'

export default interface HyLineProps {
    /**
     * @description 线条的颜色 ( 默认 '#d6d7d9' )
     * */
    color?: string
    /**
     * @description 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 ( 默认 '100%' )
     * */
    length?: string | number
    /**
     * @description 线条的方向，row-横向，column-竖向 (默认 'row' )
     * */
    direction?: HyApp.DirectionType
    /**
     * @description 是否显示细线条 (默认 true )
     * */
    hairline?: boolean
    /**
     * @description 线条与上下左右 元素的间距，字符串形式，如"30px"  (默认 0 )
     * */
    margin?: string
    /**
     * @description 是否虚线，true-虚线，false-实线 (默认 false )
     * */
    dashed?: boolean
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}
