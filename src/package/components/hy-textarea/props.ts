import type IProps from "./typing";
const defaultProps: IProps = {
  modelValue: "",
  placeholder: "",
  placeholderClass: "textarea-placeholder",
  height: 70,
  confirmType: "done",
  disabled: false,
  count: false,
  focus: false,
  autoHeight: false,
  fixed: false,
  cursorSpacing: 0,
  cursor: "",
  showConfirmBar: true,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  disableDefaultPadding: false,
  holdKeyboard: false,
  maxlength: 140,
  border: "surround",
  formatter: null,
};

export default defaultProps;
