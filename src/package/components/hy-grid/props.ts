import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  customKeys: {
    name: "name",
    icon: "icon",
  },
  col: 5,
  border: false,
  itemHeight: "80px",
  align: "left",
  gap: "0px",
  bgColor: "transparent",
  iconConfig: {},
};

export default defaultProps;
