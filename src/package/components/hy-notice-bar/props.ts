import type IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  text: [],
  direction: "row",
  step: false,
  icon: IconConfig.NOTIFICATION_FILL,
  mode: "",
  color: "",
  bgColor: "",
  speed: 80,
  fontSize: 14,
  duration: 2000,
  disableTouch: true,
  justifyContent: "flex-start",
  linkType: "navigateTo",
  url: "",
};

export default defaultProps;
