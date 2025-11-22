import type { PropType } from 'vue'

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
    }
}

export default waterfallProps
