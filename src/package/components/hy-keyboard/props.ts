import type { PropType, ExtractPropTypes } from 'vue'
import type { KeyboardMode, CarKeyboardLang } from './typing'

export const keyboardProps = {
    /** 是否可见 */
    show: {
        type: Boolean,
        default: false
    },
    /** 绑定的值 */
    modelValue: {
        type: String,
        default: ''
    },
    /** 标题 */
    title: String,
    /**
     * 键盘模式
     * @values default,custom,car,idcard
     * */
    mode: {
        type: String as PropType<KeyboardMode>,
        default: 'default'
    },
    /** 层级 */
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 最大长度 */
    maxlength: {
        type: Number,
        default: Infinity
    },
    /** 是否显示删除键 */
    showDeleteKey: {
        type: Boolean,
        default: true
    },
    /** 是否显示小数点键 */
    showDotKey: {
        type: Boolean,
        default: true
    },
    /** 是否随机键盘按键顺序 */
    randomKeyOrder: {
        type: Boolean,
        default: false
    },
    /** 确认按钮文本 */
    closeText: String,
    /** 删除按钮文本 */
    deleteText: String,
    /** 关闭按钮是否显示加载状态 */
    closeButtonLoading: {
        type: Boolean,
        default: false
    },
    /** 是否显示蒙层 */
    overlay: {
        type: Boolean,
        default: true
    },
    /** 蒙层透明度 */
    overlayOpacity: {
        type: Number,
        default: 0
    },
    /** 是否在点击外部时收起键盘 */
    hideOnClickOutside: {
        type: Boolean,
        default: true
    },
    /** 是否锁定滚动 */
    lockScroll: {
        type: Boolean,
        default: true
    },
    /** 是否在底部安全区域内 */
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    /** 额外按键 */
    extraKey: {
        type: [String, Array] as PropType<string | string[]>,
        default: ''
    },
    /** 车牌键盘语言模式 当mode=car时生效 */
    carLang: {
        type: String as PropType<CarKeyboardLang>,
        default: ''
    },
    /** 是否自动切换车牌键盘语言 当mode=car且carLang是非受控状态时生效 */
    autoSwitchLang: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<Record<string, string | number>>,
        default: () => ({})
    },
    /** 自定义外部类名 */
    customClass: String
}

export type KeyboardProps = ExtractPropTypes<typeof keyboardProps>
