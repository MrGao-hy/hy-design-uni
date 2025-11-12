// 折叠面板项组件的事件接口
export interface HyFoldingPanelItemEmits {
  /**
   * 点击面板时触发
   */
  (e: "click", index: number | string): void;
  /**
   * 面板打开时触发
   */
  (e: "open", index: number | string): void;
  /**
   * 面板关闭时触发
   */
  (e: "close", index: number | string): void;
  /**
   * 面板状态改变时触发
   */
  (e: "change", expanded: boolean, index: number | string): void;
  /**
   * 子项点击时通知父组件
   */
  (e: "child-click", index: number | string): void;
}
