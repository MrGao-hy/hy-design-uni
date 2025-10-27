import type IProps from "./typing";
import { ColorConfig } from "../../libs";

const defaultProps: IProps = {
  list: [],
  accordion: false,
  title: "",
  titleBorder: false,
  border: true,
  verticalColor: ColorConfig.primary,
  showVertical: true,
  disabled: false,
  size: "medium",
  contentHeight: 120,
};

export default defaultProps;
