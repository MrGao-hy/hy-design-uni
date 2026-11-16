import type { CSSProperties, PropType } from 'vue'

const waterfallProps = {
    /** 数据列表 */
    modelValue: {
        type: Array as PropType<AnyObject[]>,
        default: () => []
    },
    /** 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好 */
    addTime: {
        type: Number,
        default: 200
    },
    /** id值 */
    idKey: {
        type: String,
        default: 'id'
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default waterfallProps
