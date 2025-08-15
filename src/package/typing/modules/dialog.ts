export interface ResultParam {
  confirm: boolean; // 为 true 时，表示用户点击了确定按钮
  cancel: boolean; // 为 true 时，表示用户点击了取消
}

export interface DialogParam {
  icon?: string;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  shape?: "circle" | "square";
  confirmColor?: string;
  cancelColor?: string;
  showCancel?: boolean;
  result?: Function; // 回调用户操作结果
}
