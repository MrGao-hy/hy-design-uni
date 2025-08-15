import type { CSSProperties } from "vue";

export default interface HyParseProps {
  /**
   * @description 用于渲染的 html 字符串
   * */
  content?: string;
  /**
   * @description 是否允许外部链接被点击时自动复制
   * */
  copyLink?: string;
  /**
   * @description 主域名，用于拼接链接
   * */
  domain?: string;
  /**
   * @description 图片出错时的占位图链接
   * */
  errorImg?: string;
  /**
   * @description 是否开启图片懒加载
   * */
  lazyLoad?: boolean;
  /**
   * @description 图片加载过程中的占位图链接
   * */
  loadingImg?: string;
  /**
   * @description 是否在播放一个视频时自动暂停其他视频
   * */
  pauseVideo?: boolean;
  /**
   * @description 是否允许图片被点击时自动预览
   * */
  previewImg?: boolean;
  /**
   * @description 是否给每个表格添加一个滚动层使其能单独横向滚动
   * */
  scrollTable?: boolean;
  /**
   * @description 是否开启长按复制
   * */
  selectable?: boolean;
  /**
   * @description 是否将 title 标签的内容设置到页面标题
   * */
  setTitle?: boolean;
  /**
   * @description 是否允许图片被长按时显示菜单
   * */
  showImgMenu?: boolean;
  /**
   * @description 是否使用锚点链接
   * */
  useAnchor?: boolean;
  /**
   * @description 标签的默认样式
   * */
  tagStyle?: CSSProperties;
  /**
   * @description 容器的样式
   * */
  containerStyle?: CSSProperties;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
