import type { CSSProperties } from 'vue'

export default interface HyConfigProviderProps {
    /**
     * @description dark-暗色、light-亮色
     * */
    theme?: HyApp.DarkModeType
    /**
     * @description 主题色（默认 #3c9cff ）
     * */
    themeColor?: string
    /**
     * @description 内边距（默认 10px ）
     * */
    padding?: string
    /**
     * @description 定义需要用到的主题类名
     * */
    customClass?: string | string[]
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties | CSSProperties[]
}
