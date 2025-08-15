import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  indicator: false,
  indicatorActiveColor: "#FFFFFF",
  indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
  indicatorStyle: {},
  indicatorMode: "line",
  autoplay: true,
  current: 0,
  currentItemId: "",
  interval: 3000,
  duration: 300,
  circular: false,
  previousMargin: 0,
  nextMargin: 0,
  acceleration: false,
  displayMultipleItems: 1,
  easingFunction: "default",
  keyName: "url",
  imgMode: "aspectFill",
  height: 130,
  bgColor: "#f3f4f6",
  radius: 4,
  loading: false,
  showTitle: false,
};

export default defaultProps;
