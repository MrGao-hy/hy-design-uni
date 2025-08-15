import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  modelValue: 0,
  blockSize: 18,
  min: 0,
  max: 100,
  step: 1,
  activeColor: "",
  inactiveColor: "",
  blockColor: "",
  showValue: false,
  disabled: false,
  useNative: false,
  height: "2px",
  rangeValue: [0, 0],
  isRange: false,
};

export default defaultProps;
