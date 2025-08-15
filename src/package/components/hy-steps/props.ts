import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  direction: "row",
  current: 0,
  activeColor: "",
  inactiveColor: "",
  activeIcon: "",
  inactiveIcon: "",
  dot: false,
  iconSize: 17,
};

export default defaultProps;
