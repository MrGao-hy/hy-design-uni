import type IProps from "./typing";

const defaultProps: IProps = {
  isDot: false,
  value: 0,
  show: true,
  max: 999,
  type: "error",
  showZero: false,
  bgColor: null,
  color: null,
  shape: "circle",
  numberType: "overflow",
  offset: null,
  inverted: false,
  absolute: false,
};

export default defaultProps;
