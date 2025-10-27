import type IProps from "./typing";
import { IconConfig } from "../../libs/config";

const defaultProps: IProps = {
  dashed: false,
  hairline: true,
  dot: false,
  textPosition: "center",
  text: "",
  textSize: 14,
  textColor: "",
  lineColor: "",
  loadingIcon: IconConfig.LOADING,
  loadMoreText: "加载更多",
  loadingText: "正在加载...",
  noMoreText: "没有更多了",
  marginTop: "0",
  marginBottom: "0",
};

export default defaultProps;
