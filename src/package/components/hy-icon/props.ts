import type { CSSProperties, PropType } from 'vue'

const iconProps = {
    /** 图标名称 */
    name: String,
    /** 图标颜色 */
    color: String,
    /** 图标字体大小，单位px */
    size: {
        type: [Number, String],
        default: '20px'
    },
    /** 是否显示粗体 */
    bold: {
        type: Boolean,
        default: false
    },
    /** 点击图标的时候传递事件出去的index（用于区分点击了哪一个） */
    index: {
        type: String,
        default: ''
    },
    /** 自定义扩展前缀，方便用户扩展自己的图标库 */
    customPrefix: {
        type: String,
        default: 'hy-icon'
    },
    /** 图标右侧的label文字 */
    label: String,
    /**
     * label相对于图标的位置，只能right或bottom
     * @values right,bottom
     * */
    labelPos: {
        type: String,
        default: 'right'
    },
    /** label字体大小，单位px */
    labelSize: String,
    /** 图标右侧的label文字颜色 */
    labelColor: String,
    /** label与图标的距离，单位px */
    space: {
        type: [Number, String],
        default: '2px'
    },
    /** 图片的mode */
    imgMode: String,
    /** 显示图片小图标时的宽度 */
    width: [String, Number],
    /** 显示图片小图标时的高度 */
    height: [String, Number],
    /** 图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途 */
    top: {
        type: [String, Number],
        default: 0
    },
    /** 是否阻止事件传播 */
    stop: {
        type: Boolean,
        default: false
    },
    /** 是否旋转 */
    isRotate: {
        type: Boolean,
        default: false
    },
    /** 图标圆角 */
    round: {
        type: [String, Number],
        default: 0
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default iconProps
