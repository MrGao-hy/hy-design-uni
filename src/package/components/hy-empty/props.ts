import type { EmptyModeType, HyButtonProps } from '../../libs'
import { CSSProperties, PropType } from 'vue'

const emptyProps = {
    /** 是否显示空状态 */
    show: {
        type: Boolean,
        default: true
    },
    /**
     * 缺省页内容
     * @values content,search,address,network,order,coupon,collect,history,message,comment,integral,card,notification,shop,activity,loading
     * */
    mode: {
        type: String as PropType<EmptyModeType>,
        default: 'content'
    },
    /** 空状态图片 */
    imageUrl: String,
    /** 组件层级 */
    zIndex: {
        type: Number,
        default: 889
    },
    /** 图片组件宽度，单位px */
    width: {
        type: [String, Number],
        default: '240px'
    },
    /** 图片组件高度，单位px */
    height: {
        type: [String, Number],
        default: '240px'
    },
    /** 提示信息 */
    description: String,
    /** 提示信息大小，单位px */
    desSize: {
        type: Number,
        default: 15
    },
    /** 提示信息颜色 */
    desColor: String,
    /** 图片margin */
    imgMargin: String,
    /** 按钮属性值 */
    button: {
        type: Object as PropType<Partial<HyButtonProps>>
    },
    navigateUrl: String,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default emptyProps
