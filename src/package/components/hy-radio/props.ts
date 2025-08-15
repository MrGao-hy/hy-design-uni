import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  columns: [],
  fieldNames: {
    label: "label",
    value: "value",
    checked: "checked",
  },
  shape: "circle",
  size: "medium",
  disabled: false,
  activeColor: "",
  inactiveColor: "#c8c9cc",
  iconSize: "20",
  iconColor: "",
  iconPlacement: "left",
  borderBottom: false,
  label: "",
  labelSize: "",
  labelColor: "",
  labelDisabled: false,
  placement: "row",
};

export default defaultProps;
