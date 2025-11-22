import type { SubSectionVo } from './typing'
import type { CSSProperties, PropType } from 'vue'

const subsectionProps = {
    /** 接收值 */
    modelValue: [String, Number],
    /** 默认值 */
    current: {
        type: Number,
        default: 0
    },
    /** tab的数据 */
    list: {
        type: Array as PropType<SubSectionVo[]>,
        default: () => []
    },
    /** list的键值 */
    customKeys: {
        type: Object,
        default: () => ({ name: 'name', value: 'value' })
    },
    /** 激活时的颜色 */
    activeColor: String,
    /** 未激活时的颜色 */
    inactiveColor: String,
    /**
     * 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
     * @values button,subsection
     * */
    mode: {
        type: String,
        default: 'button'
    },
    /** 字体大小，单位px */
    fontSize: {
        type: Number,
        default: 12
    },
    /** 激活选项的字体是否加粗 */
    bold: {
        type: Boolean,
        default: true
    },
    /** 组件背景颜色，mode为button时有效 */
    bgColor: String,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default subsectionProps
