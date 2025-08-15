import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: 1,
  totalPage: 1,
  showIcon: false,
  showMessage: false,
  total: 0,
  pageSize: 10,
  prevText: "上一页",
  nextText: "下一页",
  hideIfOnePage: true,
};

export default defaultProps;
