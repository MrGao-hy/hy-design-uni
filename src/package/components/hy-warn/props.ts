import type { CSSProperties, PropType } from 'vue'
import type { ThemeModeType, ThemeType } from '../../libs'

const warnProps = {
    /** 显示的文字 */
    title: String,
    /**
     * 使用预设的颜色
     * @values primary,success,warning,error,info
     * */
    type: {
        type: String as PropType<ThemeType>,
        default: 'warning'
    },
    /** 辅助性文字，颜色比title浅一点，字号也小一点 */
    description: String,
    /** 显示关闭按钮 */
    closable: {
        type: Boolean,
        default: false
    },
    /** 是否显示左边的辅助图标 */
    showIcon: {
        type: Boolean,
        default: false
    },
    /**
     * 显示的暗色或者亮色
     * @values dark,light
     * */
    theme: {
        type: String as PropType<ThemeModeType>,
        default: 'dark'
    },
    /** 文字是否居中 */
    center: {
        type: Boolean,
        default: false
    },
    /** 字体大小 */
    fontSize: {
        type: [String, Number],
        default: 14
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default warnProps
