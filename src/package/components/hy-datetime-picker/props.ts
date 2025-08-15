import type IProps from "./typing";
import { DateModeEnum } from "../../typing";

const defaultProps: IProps = {
  show: false,
  popupMode: "bottom",
  showToolbar: true,
  modelValue: "",
  title: "",
  mode: DateModeEnum.DATETIME,
  maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
  minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  filter: null,
  formatter: null,
  loading: false,
  itemHeight: 44,
  cancelText: "取消",
  confirmText: "确认",
  cancelColor: "#909193",
  confirmColor: "#3c9cff",
  visibleItemCount: 5,
  closeOnClickOverlay: false,
  defaultIndex: [],
  hasInput: false,
  input: {},
  format: "",
  toolbarRightSlot: false,
};

export default defaultProps;
