import { ColorConfig } from '../../libs/config'
import type { CSSProperties, PropType } from 'vue'

const configProviderProps = {
    /**
     * 主题色，暗色或者默认白色
     * @values dark,light
     * */
    theme: {
        type: String,
        default: 'light'
    },
    /** 主题色 */
    themeColor: {
        type: String,
        default: ColorConfig.primary
    },
    /** 内边距 */
    padding: [String, Number],
    /** 定义需要用到的主题类名 */
    customClass: String,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: [Object, Array] as PropType<CSSProperties | CSSProperties[]>
    }
}

export default configProviderProps
