import type { CSSProperties, PropType } from 'vue'

const indexAnchorProps = {
    /**
     * 索引值，同时作为锚点id与默认标题内容
     */
    index: {
        type: [String, Number] as PropType<string | number>,
        required: true
    },
    /**
     * 当前索引是否激活，仅独立使用（未放入hy-index-bar插槽）时生效；
     * 配合索引栏时激活状态由其v-model驱动
     */
    active: {
        type: Boolean,
        default: false
    },
    /**
     * 是否开启吸顶，仅独立使用（未放入hy-index-bar插槽）时生效，且仅在激活状态下生效；
     * 配合索引栏时以索引栏的sticky为准
     */
    sticky: {
        type: Boolean,
        default: true
    },
    /**
     * 吸顶时距离滚动容器顶部的偏移量，单位px
     */
    offsetTop: {
        type: [Number, String],
        default: 0
    },
    /**
     * 吸顶时的层级
     */
    zIndex: {
        type: [Number, String],
        default: 1
    },
    /**
     * 自定义样式
     */
    customStyle: Object as PropType<CSSProperties>,
    /**
     * 自定义外部类名
     */
    customClass: String
}

export default indexAnchorProps
