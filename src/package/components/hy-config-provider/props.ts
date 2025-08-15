import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  theme: "light",
  themeColor: ColorConfig.primary,
  themeLightColor: "#ecf5ff",
  padding: "",
  customClass: "",
  customStyle: {},
};

export default defaultProps;
