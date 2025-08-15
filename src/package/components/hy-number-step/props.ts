import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: 0,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  integer: false,
  disabled: false,
  disabledInput: false,
  asyncChange: false,
  inputWidth: 35,
  showMinus: true,
  showPlus: true,
  decimalLength: null,
  longPress: true,
  color: "",
  buttonWidth: 30,
  buttonSize: 30,
  buttonRadius: "",
  bgColor: "",
  inputBgColor: "",
  cursorSpacing: 100,
  disableMinus: false,
  disablePlus: false,
  miniMode: false,
};

export default defaultProps;
