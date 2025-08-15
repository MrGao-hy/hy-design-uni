import type IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  safeAreaInsetTop: true,
  placeholder: false,
  fixed: true,
  border: false,
  leftIcon: IconConfig.LEFT,
  leftText: "",
  rightText: "",
  rightIcon: "",
  title: "",
  sub: "",
  titleColor: "",
  bgColor: "",
  titleWidth: "400rpx",
  height: "44px",
  leftIconSize: 20,
  leftIconColor: "",
  autoBack: false,
};

export default defaultProps;
