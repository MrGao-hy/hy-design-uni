export interface FileVo {
    /**
     * 上传文件本地地址链接
     * */
    url?: string
    /**
     * 上传文件类型
     * */
    type?: 'image' | 'video' | 'file'
    /**
     * 上传文件本地地址链接
     * */
    thumb?: string
    /**
     * 文件大小
     * */
    size?: number
    /**
     * 是否视频
     * */
    isVideo?: boolean
    /**
     * 是否图片
     * */
    isImage?: boolean
    /**
     * 是否显示删除按钮
     * */
    deletable?: boolean
    /**
     * 上传时候状态
     * */
    status?: 'loading' | 'failed' | 'success'
    /**
     * 提示信息
     * */
    message?: string
    /**
     * 进度条
     * */
    schedule?: number
}

/**
 * 接受的文件类型
 *
 * @default image
 *
 * @values
 * all-所有文件类型
 * media-媒体文件（图片和视频）
 * image-图片文件
 * file-普通文件
 * video-视频文件
 */
export type FileType = 'image' | 'video' | 'media' | 'file' | 'all'

/**
 * 摄像头方向类型
 *
 * 用于视频拍摄时选择使用的摄像头。
 *
 * @values
 * back-后置摄像头
 * front-前置摄像头
 */
export type CameraType = 'back' | 'front'

export type ReadFunctionVo = (file: FileVo, detail: { name: string; index: number }) => void

export interface UploadFileParams {
    file: FileVo | FileVo[]
    name: string
    index: number
}

export interface IUploadEmits {
    // (e: 'clickPreview', params: UploadFileParams): void
    /** 上传前触发 */
    beforeRead: [params: UploadFileParams]
    /** 上传错误触发 */
    error: [error: any]
    /** 删除触发 */
    delete: [params: UploadFileParams]
    /** 上传完成触发 */
    afterRead: [params: UploadFileParams]
    /** 点击预览大图触发 */
    clickPreview: [payload: PreviewItem]
    /** 超出最大值 */
    oversize: [val: PreviewItem | FileVo]
}
