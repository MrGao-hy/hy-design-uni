import type IProps from "./typing";
import { IconConfig } from "../../libs/config";

const defaultProps: IProps = {
  src: "",
  mode: "aspectFill",
  width: "",
  height: "",
  shape: "square",
  radius: 0,
  lazyLoad: true,
  showMenuByLongPress: true,
  loadingIcon: IconConfig.LOADING,
  errorIcon: IconConfig.NOTICE,
  showLoading: true,
  showError: true,
  fade: true,
  webp: false,
  duration: 500,
  bgColor: "",
  indistinct: false,
  previewImage: false,
};

export default defaultProps;
