import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  current: 0,
  keyName: "name",
  duration: 300,
  lineColor: "",
  activeStyle: {},
  inactiveStyle: {},
  lineWidth: 20,
  lineHeight: 3,
  lineBgSize: "cover",
  itemStyle: {},
  swiperHeight: "calc(100vh - 44px)",
  scrollable: true,
  iconStyle: {},
};

export default defaultProps;
