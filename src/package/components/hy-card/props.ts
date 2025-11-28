import type IProps from './typing'
import type { CSSProperties, PropType } from 'vue'

const cardProps = {
    /** 卡片与屏幕两侧是否留空隙,false-不留缝隙，true-有margin */
    full: {
        type: Boolean,
        default: false
    },
    /** 头部左边的标题 */
    title: String,
    /** 标题颜色 */
    titleColor: String,
    /** 标题字体大小，单位rpx */
    titleSize: {
        type: String,
        default: ''
    },
    /** 头部右边的副标题 */
    subTitle: String,
    /** 副标题颜色 */
    subTitleColor: {
        type: String,
        default: ''
    },
    /** 副标题字体大小 */
    subTitleSize: {
        type: [String, Number],
        default: ''
    },
    /** 右边内容 */
    rightText: {
        type: String,
        default: ''
    },
    /** 右边内容颜色 */
    rightTextColor: {
        type: String,
        default: ''
    },
    /** 右边内容字体大小 */
    rightTextSize: {
        type: [String, Number],
        default: ''
    },
    /** 是否显示边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** 用于标识点击了第几个卡片 */
    index: [String, Number],
    /** 卡片与屏幕两边和上下元素的间距，需带单位，如"30px 20px" */
    margin: {
        type: String,
        default: '0 0 20rpx'
    },
    /** 卡片整体的圆角值，单位px */
    borderRadius: {
        type: [String, Number],
        default: 8
    },
    /** 是否显示头部的下边框 */
    headBorderBottom: {
        type: Boolean,
        default: false
    },
    /** 是否显示底部的上边框 */
    footBorderTop: {
        type: Boolean,
        default: false
    },
    /** 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径 */
    thumb: String,
    /** 缩略图的宽度，高等于宽，单位px */
    thumbWidth: {
        type: [String, Number],
        default: 30
    },
    /** 缩略图是否为圆形 */
    thumbCircle: {
        type: Boolean,
        default: false
    },
    /** 给head，body，foot的内边距 */
    padding: {
        type: [String, Number]
    },
    /** 头部内边距 */
    paddingHead: [String, Number],
    /** 中部内边距 */
    paddingBody: [String, Number],
    /** 尾部内边距 */
    paddingFoot: [String, Number],
    /** 是否显示头部 */
    showHead: {
        type: Boolean,
        default: true
    },
    /** 是否显示尾部 */
    showFoot: {
        type: Boolean,
        default: true
    },
    /** 卡片外围阴影，字符串形式 */
    boxShadow: {
        type: [Boolean, String],
        default: true
    },
    /** 头部自定义样式，对象形式 */
    headStyle: Object as PropType<CSSProperties>,
    /** 中部自定义样式 */
    bodyStyle: Object as PropType<CSSProperties>,
    /** 底部自定义样式 */
    footStyle: Object as PropType<CSSProperties>,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default cardProps
