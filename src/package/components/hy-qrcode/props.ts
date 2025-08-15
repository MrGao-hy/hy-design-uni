import type IProps from "./typing";

const defaultProps: IProps = {
  cid: "hy-qrcode-canvas" + Math.random().toString(),
  size: 200,
  text: "",
  show: true,
  background: "#ffffff",
  foreground: "#000000",
  pdGround: "#000000",
  usingComponents: true,
  lv: 3,
  icon: "",
  iconSize: 40,
  showLoading: true,
  loadingText: "二维码生成中",
  allowPreview: false,
};

export default defaultProps;
