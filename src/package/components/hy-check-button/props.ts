import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  columns: [],
  fieldNames: {
    label: "label",
    value: "value",
    checked: "checked",
  },
  selectType: "checkbox",
  disabled: false,
  col: "repeat(3, 1fr)",
  gap: "10px",
  type: "primary",
  size: "medium",
  shape: "square",
};

export default defaultProps;
