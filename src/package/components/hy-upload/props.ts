import type { FileVo, ReadFunctionVo } from './typing'
import { IconConfig } from '../../libs'
import type { CSSProperties, PropType } from 'vue'

const uploadProps = {
    /**
     * 接受的文件类型
     * @values all,media,image,file,video
     * */
    accept: {
        type: String,
        default: 'image'
    },
    /** 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。 */
    extension: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    /** 图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头 */
    capture: {
        type: Array as PropType<('album' | 'camera')[]>,
        default: () => ['album', 'camera']
    },
    /** 当accept为video时生效，是否压缩视频 */
    compressed: {
        type: Boolean,
        default: true
    },
    /** 当accept为video时生效，可选值为back或front */
    camera: {
        type: String,
        default: 'back'
    },
    /** 当accept为video时生效，拍摄视频最长拍摄时间，单位秒 */
    maxDuration: {
        type: Number,
        default: 60
    },
    /** 上传区域的图标，只能内置图标 */
    uploadIcon: {
        type: String,
        default: IconConfig.UPLOAD
    },
    /** 上传区域的图标的字体颜色，只能内置图标 */
    uploadIconColor: {
        type: String,
        default: '#D3D4D6'
    },
    /** 是否开启文件读取前事件 */
    useBeforeRead: {
        type: Boolean,
        default: false
    },
    /** 是否显示组件自带的图片预览功能 */
    previewFullImage: {
        type: Boolean,
        default: true
    },
    /** 最大上传数量 */
    maxCount: {
        type: Number,
        default: 52
    },
    /** 是否启用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 预览上传的图片时的裁剪模式，和image组件mode属性一致
     * @values scaleToFill,aspectFit,aspectFill,widthFix,heightFix,top,bottom,center,left,right,top left,top right,bottom left,bottom right
     * */
    imageMode: {
        type: String,
        default: 'aspectFill'
    },
    /** 标识符，可以在回调函数的第二项参数中获取 */
    name: {
        type: String,
        default: ''
    },
    /** 所选的图片的尺寸 */
    sizeType: {
        type: Array as PropType<('original' | 'compressed')[]>,
        default: ['original', 'compressed']
    },
    /** 是否开启图片多选，部分安卓机型不支持 */
    multiple: {
        type: Boolean,
        default: false
    },
    /** 是否展示删除按钮 */
    deletable: {
        type: Boolean,
        default: true
    },
    /** 文件大小限制，单位为byte */
    maxSize: {
        type: Number,
        default: Number.MAX_VALUE
    },
    /** 显示已上传的文件列表 */
    fileList: {
        type: Array as PropType<FileVo[]>,
        default: () => []
    },
    /** 上传区域的提示文字 */
    uploadText: {
        type: String,
        default: ''
    },
    /** 内部预览图片区域和选择图片按钮的区域宽度 */
    width: {
        type: [String, Number],
        default: 80
    },
    /** 内部预览图片区域和选择图片按钮的区域高度 */
    height: {
        type: [String, Number],
        default: 80
    },
    /** 读取前的处理函数 */
    beforeRead: Function as PropType<ReadFunctionVo>,
    /** 读取后的处理函数 */
    afterRead: Function as PropType<ReadFunctionVo>,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    }
}

export default uploadProps
