declare namespace HyMediaType {
    interface ChooseFile {
        path: string // 上传临时地址
        size?: number // 上传大小
        name?: string // 当前文件名称，仅h5支持
        type: 'image' | 'video' | 'file' // 上传类型
        duration?: number // 上传时间
        thumb?: string // 缩略图地址
    }
    interface ChooseFileOption {
        // 是否支持多选文件
        multiple?: boolean
        // 所选的图片的尺寸
        sizeType?: UploadSizeType[]
        // 选择文件的来源
        sourceType?: UploadSourceType[]
        // 最大允许上传个数
        maxCount?: number
        // 接受文件类型
        accept?: UploadFileType
        /**
         * 是否压缩视频，当 accept 为 video 时生效。
         */
        compressed?: boolean
        /**
         * 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。
         */
        maxDuration?: number
        /**
         * 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。
         */
        camera?: UploadCameraType
        /**
         * 根据文件拓展名过滤,H5、微信小程序支持
         * 每一项都不能是空字符串, 默认不过滤
         * 例如: ['.jpg'] 表示只选择.jpg文件
         */
        extension?: string[]
    }
}
