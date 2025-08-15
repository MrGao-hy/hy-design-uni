import type IProps from "./typing";

const defaultProps: IProps = {
  title: "日期选择",
  showTitle: true,
  showSubtitle: true,
  mode: "single",
  startText: "开始",
  endText: "结束",
  customList: [],
  color: "",
  minDate: 0,
  maxDate: 0,
  defaultDate: null,
  maxCount: Number.MAX_SAFE_INTEGER, // Infinity
  rowHeight: 56,
  formatter: null,
  showLunar: false,
  showMark: true,
  confirmText: "确定",
  confirmDisabledText: "确定",
  show: false,
  closeOnClickOverlay: false,
  readonly: false,
  showConfirm: true,
  maxRange: Number.MAX_SAFE_INTEGER,
  rangePrompt: "",
  showRangePrompt: true,
  allowSameDay: false,
  round: 0,
  monthNum: 3,
  weekText: ["一", "二", "三", "四", "五", "六", "日"],
  forbidDays: [],
  forbidDaysToast: "该日期已禁用",
};

export default defaultProps;
