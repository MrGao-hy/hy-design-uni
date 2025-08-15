import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  show: false,
  popupMode: "bottom",
  separator: "/",
  showToolbar: true,
  title: "",
  columns: [],
  loading: false,
  itemHeight: 44,
  cancelText: "取消",
  confirmText: "确定",
  cancelColor: "#909193",
  confirmColor: "",
  visibleItemCount: 5,
  keyName: "text",
  closeOnClickOverlay: false,
  defaultIndex: [],
  immediateChange: true,
  zIndex: 10076,
  hasInput: false,
  input: {},
  toolbarRightSlot: false,
};

export default defaultProps;
