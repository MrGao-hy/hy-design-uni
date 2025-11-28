import type { CSSProperties, PropType } from 'vue'
import type { HyIconProps } from '../hy-icon/typing'

const cellItemProps = {
    /** 头部标题 */
    title: String,
    /** 标题下面小提示 */
    sub: String,
    /** 是否禁用cell */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 右侧的内容 */
    value: String,
    /** 图标，接收icon对象 */
    icon: {
        type: Object as PropType<HyIconProps>
    },
    /** 右边图标，默认是向左图标 */
    rightIcon: {
        type: Object as PropType<HyIconProps>
    },
    /**
     * 右侧箭头的方向
     * @values left,up,down
     * */
    arrowDirection: {
        type: String,
        default: 'right'
    },
    /**
     * 点击后跳转的URL地址
     * */
    url: {
        type: String,
        default: ''
    },
    /**
     * 链接跳转的方式，内部使用的是uview-plus封装的route方法，可能会进行拦截操作
     * */
    linkType: {
        type: String,
        default: 'navigateTo'
    },
    /**
     * 点击cell是否阻止事件传播
     * */
    stop: {
        type: Boolean,
        default: true
    },
    /**
     * 标识符，用于在click事件中进行返回
     * */
    name: {
        type: [String, Number],
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default cellItemProps
