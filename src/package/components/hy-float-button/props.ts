import type IProps from "./typing";
import { IconConfig } from "../../libs";

const defaultProps: IProps = {
  menus: [],
  direction: "column",
  icon: IconConfig.PLUS,
  iconSize: "",
  iconColor: "",
  gap: { left: 16, right: 16, top: 16, bottom: 40 },
  zIndex: 10086,
  bgColor: "",
  text: "",
  fontSize: "12px",
  textColor: "",
  size: "medium",
  shape: "circle",
  opacity: 1,
  shadow: true,
  float: true,
  fixed: true,
  draggable: true,
  position: "right-bottom",
  expandable: true,
};

export default defaultProps;
