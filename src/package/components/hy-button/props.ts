import type { CSSProperties, PropType } from 'vue'
import type { HyIconProps } from '../hy-icon/typing'

const buttonProps = {
    /** 是否显示按钮的细边框 */
    hairline: {
        type: Boolean,
        default: true
    },
    /** 是否显示按钮的边框 */
    border: {
        type: Boolean,
        default: true
    },
    /**
     * 按钮的预置样式
     * @values info,primary,error,warning,success
     * */
    type: {
        type: String,
        default: 'primary'
    },
    /**
     * 按钮尺寸
     * @values large,medium,small,mini
     * */
    size: {
        type: String,
        default: 'medium'
    },
    /**
     * 按钮形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 按钮是否镂空，背景色透明  */
    plain: {
        type: Boolean,
        default: false
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 按钮名称前是否带 loading 图标 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 加载中提示文字 */
    loadingText: String,
    /**
     * 加载状态图标类型
     * @values spinner,circle,semicircle
     * */
    loadingMode: {
        type: String,
        default: 'spinner'
    },
    /** 加载图标大小 */
    loadingSize: {
        type: [Number, String],
        default: 13
    },
    /** 开放能力，具体请看uniapp稳定关于button组件部分说明 */
    openType: String,
    /** 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 */
    formType: String,
    /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效） */
    appParameter: String,
    /** 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 */
    hoverStopPropagation: {
        type: Boolean,
        default: true
    },
    /**
     * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ）
     * @values zh_CN,zh_TW,en
     * */
    lang: {
        type: String,
        default: 'en'
    },
    /** 会话来源，openType="contact"时有效 */
    sessionFrom: String,
    /** 会话内消息卡片标题，openType="contact"时有效 */
    sendMessageTitle: String,
    /** 会话内消息卡片点击跳转小程序路径，openType="contact"时有效 */
    sendMessagePath: String,
    /** 会话内消息卡片图片，openType="contact"时有效 */
    sendMessageImg: String,
    /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 */
    showMessageCard: {
        type: Boolean,
        default: false
    },
    /** 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 */
    dataName: String,
    /** 节流时间，一定时间内只能触发一次 */
    throttleTime: {
        type: Number,
        default: 0
    },
    /** 按住后多久出现点击态，单位毫秒 */
    hoverStartTime: {
        type: Number,
        default: 0
    },
    /** 手指松开后点击态保留时间，单位毫秒 */
    hoverStayTime: {
        type: Number,
        default: 200
    },
    /** 按钮文字，之所以通过props传入，是因为slot传入的话（注：nvue中无法控制文字的样式） */
    text: String,
    /** 按钮图标api集合 */
    icon: Object as PropType<HyIconProps>,
    /** 按钮颜色，支持传入linear-gradient渐变色 */
    color: String,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String,
    /** 阻止事件冒泡 */
    stop: {
        type: Boolean,
        default: true
    },
    /**
     * 在支付宝小程序使用，当 open-type 为 getAuthorize 时有效。
     * @values userInfo,phoneNumber
     * */
    scope: {
        type: String,
        default: ''
    }
} as const

export default buttonProps
