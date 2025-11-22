import type { CSSProperties, PropType } from 'vue'

const lineProps = {
    /** 线条的颜色 */
    color: String,
    /** 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 */
    length: {
        type: String,
        default: '100%'
    },
    /**
     * 线条的方向
     * @values row,column
     * */
    direction: {
        type: String,
        default: 'row'
    },
    /** 是否显示细线条 */
    hairline: {
        type: Boolean,
        default: true
    },
    /** 线条与上下左右 元素的间距，字符串形式，如"30px" */
    margin: {
        type: [String, Number],
        default: 0
    },
    /** 是否虚线 */
    dashed: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default lineProps
