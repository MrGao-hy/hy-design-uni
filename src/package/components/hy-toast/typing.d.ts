export default interface ToastOptions {
  /**
   * @description 显示文本
   * */
  message?: string;
  /**
   * @description 主题类型，primary，success，error，warning，info
   * */
  type?: HyApp.ThemeType;
  /**
   * @description toast出现的位置
   * */
  position?: HyApp.ColumnCenterType;
  /**
   * @description 显示的图标
   * */
  icon?: boolean | string;
  /**
   * @description 是否防止触摸穿透
   * */
  overlay?: boolean;
  /**
   * @description 是否加载中状态
   * */
  loading?: boolean;
  /**
   * @description 加载状态
   * */
  loadMode?: HyApp.LoadingMode;
  /**
   * @description 显示的时间，毫秒
   * */
  duration?: number;
  /**
   * @description 执行完后的回调函数
   * */
  complete?: Function | null;
}
