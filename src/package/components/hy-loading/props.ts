import type { CSSProperties, PropType } from 'vue'

const loadingProps = {
    /** 是否显示组件 */
    show: {
        type: Boolean,
        default: true
    },
    /** 动画活动区域的颜色，只对 mode = flower 模式有效 */
    color: {
        type: String,
        default: '#909399'
    },
    /** 提示文本的颜色 */
    textColor: {
        type: String,
        default: '#909399'
    },
    /**
     * 文字和图标是否垂直排列
     * @values row,column
     * */
    direction: {
        type: String,
        default: 'row'
    },
    /**
     * 加载样式选择
     * @values spinner, circle, semicircle
     * */
    mode: {
        type: String,
        default: 'spinner'
    },
    /** 加载图标的大小，单位px */
    size: {
        type: [String, Number],
        default: 24
    },
    /** 文字大小 */
    textSize: {
        type: [String, Number],
        default: 15
    },
    /** 文字内容 */
    text: String,
    /** 动画模式 */
    timingFunction: {
        type: String,
        default: 'ease-in-out'
    },
    /** 动画执行周期时间 */
    duration: {
        type: Number,
        default: 1200
    },
    /** mode=circle时的暗边颜色 */
    inactiveColor: String,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default loadingProps
