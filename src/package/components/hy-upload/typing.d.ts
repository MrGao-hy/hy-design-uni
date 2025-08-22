import type { CSSProperties } from "vue";

export interface FileVo {
  /**
   * 上传文件本地地址链接
   * */
  url?: string;
  /**
   * 上传文件类型
   * */
  type?: "image" | "video" | "file";
  /**
   * 上传文件本地地址链接
   * */
  thumb?: string;
  /**
   * 文件大小
   * */
  size?: number;
  /**
   * 是否视频
   * */
  isVideo?: boolean;
  /**
   * 是否图片
   * */
  isImage?: boolean;
  /**
   * 是否显示删除按钮
   * */
  deletable?: boolean;
  /**
   * 上传时候状态
   * */
  status?: "loading" | "failed" | "success";
  /**
   * 提示信息
   * */
  message?: string;
  /**
   * 进度条
   * */
  schedule?: string | number;
}

export type ReadFunctionVo = (
  file: FileVo,
  detail: { name: string; index: number },
) => void;

export default interface HyUploadProps {
  /**
   * 接受的文件类型, 可选值为all media image file video （默认 'image' ）
   * */
  accept?: HyApp.FileType;
  /**
   * 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
   * */
  extension?: string[];
  /**
   * 图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头（默认 ['album', 'camera'] ）
   * */
  capture?: ("album" | "camera")[];
  /**
   * 当accept为video时生效，是否压缩视频，默认为true（默认 true ）
   * */
  compressed?: boolean;
  /**
   * 当accept为video时生效，可选值为back或front（默认 'back' ）
   * */
  camera?: "back" | "front";
  /**
   * 当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
   * */
  maxDuration?: number;
  /**
   * 上传区域的图标，只能内置图标（默认 'camera-fill' ）
   * */
  uploadIcon?: string;
  /**
   * 上传区域的图标的字体颜色，只能内置图标（默认 #D3D4D6 ）
   * */
  uploadIconColor?: string;
  /**
   * 是否开启文件读取前事件（默认 false ）
   * */
  useBeforeRead?: boolean;
  /**
   * 是否显示组件自带的图片预览功能（默认 true ）
   * */
  previewFullImage?: boolean;
  /**
   * 最大上传数量（默认 52 ）
   * */
  maxCount?: number;
  /**
   * 是否启用（默认 false ）
   * */
  disabled?: boolean;
  /**
   * 预览上传的图片时的裁剪模式，和image组件mode属性一致（默认 'aspectFill' ）
   * */
  imageMode?: "aspectFill" | "aspectFit" | "widthFix";
  /**
   * 标识符，可以在回调函数的第二项参数中获取
   * */
  name?: string;
  /**
   * 所选的图片的尺寸, 可选值为original compressed（默认 ['original', 'compressed'] ）
   * */
  sizeType?: ("original" | "compressed")[];
  /**
   * 是否开启图片多选，部分安卓机型不支持 （默认 false ）
   * */
  multiple?: boolean;
  /**
   * 是否展示删除按钮（默认 true ）
   * */
  deletable?: boolean;
  /**
   * 文件大小限制，单位为byte （默认 Number.MAX_VALUE ）
   * */
  maxSize?: number;
  /**
   * 显示已上传的文件列表
   * */
  fileList?: FileVo[];
  /**
   * 上传区域的提示文字
   * */
  uploadText?: string;
  /**
   * 内部预览图片区域和选择图片按钮的区域宽度（默认 80 ）
   * */
  width?: string | number;
  /**
   * 内部预览图片区域和选择图片按钮的区域高度（默认 80 ）
   * */
  height?: string | number;
  /**
   * 读取前的处理函数
   * */
  beforeRead?: (file: FileVo, detail: { name: string; index: number }) => void;
  /**
   * 读取后的处理函数
   * */
  afterRead?: (file: FileVo, detail: { name: string; index: number }) => void;
  /**
   * 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface UploadFileParams {
  file: FileVo | FileVo[];
  name: string;
  index: number;
}

export interface IUploadEmits {
  /** 点击预览大图触发 */
  (e: "clickPreview", params: UploadFileParams): void;
  /** 上传前触发 */
  (e: "beforeRead", params: UploadFileParams): void;
  /** 上传错误触发 */
  (e: "error", error: any): void;
  /** 删除触发 */
  (e: "delete", params: UploadFileParams): void;
  /** 上传完成触发 */
  (e: "afterRead", params: UploadFileParams): void;
  /** 超出最大值 */
  (e: "oversize", params: UploadFileParams): void;
}
