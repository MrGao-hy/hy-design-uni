import type { CSSProperties, PropType } from 'vue'
import type HyIconProps from './typing'

const tagProps = {
    /** 标签的文字内容 */
    text: String,
    /** 点击需要传得值 */
    name: [String, Number],
    /**
     * 标签类型
     * @values info,primary,success,error,warning
     * */
    type: {
        type: String,
        default: 'primary'
    },
    /** 禁用点击标签 */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 标签的大小
     * @values large,medium,small,mini
     * */
    size: {
        type: String,
        default: 'medium'
    },
    /**
     * tag的形状
     * @values circle,square,opposite
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 背景颜色，默认为空字符串，即不处理 */
    bgColor: String,
    /** 标签字体颜色，默认为空字符串，即不处理 */
    color: String,
    /** 镂空形式标签的边框颜色 */
    borderColor: String,
    /** 关闭按钮图标的颜色 */
    closeColor: {
        type: String,
        default: '#C6C7CB'
    },
    /** 镂空时是否填充背景色 */
    plainFill: {
        type: Boolean,
        default: false
    },
    /** 是否镂空 */
    plain: {
        type: Boolean,
        default: false
    },
    /** 是否可关闭，设置为true，文字右边会出现一个关闭图标 */
    closable: {
        type: Boolean,
        default: false
    },
    /** 标签显示与否 */
    show: {
        type: Boolean,
        default: true
    },
    /** 组件内置图标，或绝对路径的图片 */
    icon: Object as PropType<HyIconProps>,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: {
        type: String,
        default: ''
    }
}

export default tagProps
