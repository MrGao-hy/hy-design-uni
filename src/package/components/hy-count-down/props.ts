import type { CSSProperties, PropType } from 'vue'

const countDownProps = {
    /** 倒计时时长，单位ms */
    time: {
        type: Number,
        default: 0
    },
    /** 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 */
    format: {
        type: String,
        default: 'HH:mm:ss'
    },
    /** 是否自动开始倒计时 */
    autoStart: {
        type: Boolean,
        default: true
    },
    /** 是否展示毫秒倒计时 */
    millisecond: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default countDownProps
