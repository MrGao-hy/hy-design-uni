import type { CSSProperties, PropType } from 'vue'

const foldingPanelItemProps = {
    /**
     * 面板索引（由父组件自动设置）
     */
    index: {
        type: [Number, String],
        default: -1,
        required: true
    },
    /**
     * 面板标题
     */
    title: {
        type: String,
        default: ''
    },
    /**
     * 右侧显示的值
     */
    value: {
        type: String,
        default: ''
    },
    /**
     * 左侧图标
     */
    icon: {
        type: String,
        default: ''
    },
    /**
     * 左侧图标颜色
     */
    iconColor: {
        type: String,
        default: ''
    },
    /**
     * 左侧图标大小
     */
    iconSize: {
        type: [Number, String],
        default: ''
    },
    /**
     * 面板内容
     */
    content: {
        type: String,
        default: ''
    },
    /**
     * 是否禁用
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 默认是否展开
     */
    defaultOpen: {
        type: Boolean,
        default: false
    },
    /**
     * 内容区域最大高度
     */
    contentHeight: {
        type: [Number, String],
        default: 150
    },
    /**
     * 自定义样式
     */
    customStyle: Object as PropType<CSSProperties>
}

export default foldingPanelItemProps
