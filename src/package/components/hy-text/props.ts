import type IProps from "./typing";

const defaultProps: IProps = {
  text: "",
  type: "",
  show: true,
  prefixIcon: "",
  suffixIcon: "",
  mode: "text",
  href: "",
  format: "",
  call: false,
  openType: "",
  bold: false,
  block: false,
  lines: "",
  color: "",
  size: 15,
  iconStyle: {
    fontSize: "15px",
  },
  decoration: "",
  margin: "",
  lineHeight: "",
  align: "left",
  wordWrap: "normal",
  flex: true,
};

export default defaultProps;
