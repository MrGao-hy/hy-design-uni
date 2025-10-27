import type IProps from "./typing";
import { ColorConfig } from "../../libs/config";

const defaultProps: IProps = {
  list: [],
  title: "",
  showVertical: true,
  border: true,
  borderRadius: "5px",
  disabled: false,
  clickable: false,
  size: "medium",
  value: "",
  arrange: "right",
  rightIcon: {},
  arrowDirection: "right",
};

export default defaultProps;
