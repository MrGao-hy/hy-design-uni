import type { ThemeType, ColumnCenterType, LoadingMode } from '../../libs'
import type { HyIconProps } from '../hy-icon/typing'

export interface ToastOptions {
    /**
     * 显示文本
     * */
    message?: string
    /**
     * 主题类型，primary，success，error，warning，info
     * */
    type?: ThemeType | ''
    /**
     * toast出现的位置
     * */
    position?: ColumnCenterType
    /**
     * 显示的图标
     * */
    icon?: boolean | string | HyIconProps
    /**
     * 是否防止触摸穿透
     * */
    overlay?: boolean
    /**
     * 是否显示透明遮罩层
     * */
    cover?: boolean
    /**
     * 是否加载中状态
     * */
    loading?: boolean
    /**
     * 加载状态
     * */
    loadMode?: LoadingMode
    /**
     * 显示的时间，毫秒
     * */
    duration?: number
    /**
     * 执行完后的回调函数
     * */
    complete?: Function | null
}

/** HyToast 组件实例暴露的方法 */
export interface IToastExpose {
    /**
     * 显示 Toast
     * @param options Toast 配置选项
     */
    show: (options: ToastOptions) => void
    /**
     * 隐藏 Toast
     */
    hide: () => void
}
