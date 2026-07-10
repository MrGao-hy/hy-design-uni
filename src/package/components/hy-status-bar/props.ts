import type { CSSProperties, PropType } from 'vue'

const statusBarProps = {
    /** 背景色 */
    bgColor: {
        type: String,
        default: 'transparent'
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default statusBarProps
