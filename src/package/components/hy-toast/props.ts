import type { CSSProperties, PropType } from 'vue'
import type { ThemeType, ColumnCenterType, LoadingMode } from '../../libs'
import type { HyIconProps } from '../hy-icon/typing'

const toastProps = {
    /** 展示的文字内容 */
    message: String,
    /**
     * 主题类型
     * @values primary,success,warning,error,info
     * */
    type: {
        type: String as PropType<ThemeType | ''>,
        default: ''
    },
    /**
     * toast出现的位置
     * @values top,center,bottom
     * */
    position: {
        type: String as PropType<ColumnCenterType>,
        default: 'center'
    },
    /** 显示的图标 */
    icon: {
        type: [Boolean, String, Object] as PropType<boolean | string | HyIconProps>,
        default: false
    },
    /** 是否防止触摸穿透 */
    overlay: {
        type: Boolean,
        default: true
    },
    /** 是否显示透明遮罩层 */
    cover: {
        type: Boolean,
        default: false
    },
    /** 是否加载中状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /**
     * 加载状态
     * @values circle,spinner,semicircle,dots,bars
     * */
    loadMode: {
        type: String as PropType<LoadingMode>,
        default: 'circle'
    },
    /** 展示时长，-1时不自动关闭，单位ms */
    duration: {
        type: Number,
        default: 2000
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default toastProps
