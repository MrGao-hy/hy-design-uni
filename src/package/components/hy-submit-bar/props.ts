import type IProps from "./typing";

const defaultProps: IProps = {
  menus: [],
  fixed: true,
  border: true,
  leftLoading: false,
  rightLoading: false,
  iconColor: "",
  iconLabelColor: "#909193FF",
  textColor: "",
  showLeftBtn: true,
  showRightBtn: true,
  leftBtnText: "加入购物车",
  rightBtnText: "立即购买",
  leftBtnColor: "#ed3f14",
  rightBtnColor: "#ff7900",
  shape: "circle",
  warn: 300,
};

export default defaultProps;
