import type IProps from "./typing";
import { IconConfig } from "@/package";

const defaultProps: IProps = {
  activeColor: "",
  inactiveColor: "",
  closeOnClickMask: true,
  sticky: true,
  height: 40,
  borderBottom: false,
  titleSize: 16,
  borderRadius: 0,
  menuIcon: IconConfig.ARROW_DOWN_FILL,
  menuIconSize: 14,
};

export default defaultProps;
