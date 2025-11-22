import type { CSSProperties, PropType } from 'vue'

const avatarProps = {
    /** 头像路径 */
    src: String,
    /**
     * 头像形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'circle'
    },
    /**
     * 头像尺寸
     * @values large, medium, small
     * */
    size: {
        type: [String, Number],
        default: 'medium'
    },
    /**
     * 头像图片的裁剪类型
     * @values scaleToFill,aspectFit,aspectFill,widthFix,heightFix,top,bottom,center,left,right,top left,top right,bottom left,bottom right
     * */
    mode: {
        type: String,
        default: 'scaleToFill'
    },
    /** 用文字替代图片，级别优先于src */
    text: String,
    /** 头像背景颜色 */
    bgColor: {
        type: String,
        default: '#c0c4cc'
    },
    /** 文字颜色 */
    color: {
        type: String,
        default: '#ffffff'
    },
    /** 文字大小 */
    fontSize: {
        type: Number,
        default: 18
    },
    /** 显示的图标 */
    icon: String,
    /** 显示小程序头像，只对百度，微信，QQ小程序有效 */
    mpAvatar: {
        type: Boolean,
        default: false
    },
    /** 是否使用随机背景色 */
    randomBgColor: {
        type: Boolean,
        default: false
    },
    /** 加载失败的默认头像(组件有内置默认图片) */
    defaultUrl: String,
    /** 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间 */
    colorIndex: {
        type: Number,
        default: 0
    },
    /** 组件标识符 */
    name: {
        type: String,
        default: ''
    },
    /** 自定义输入框外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    }
}

export default avatarProps
