/**
 * @deprecated 改成DateModeEnum，请尽快改
 * */
export enum ModeEnum {
  /**
   * 年月日时分秒格式：2024-10-10 10:10:11
   * */
  DATETIME = "datetime",
  /**
   * 日期选择器：2024-10-10
   * */
  DATE = "date",
  /**
   * 时间选择器：10:10:11
   * */
  TIME = "time",
  /**
   * 年月选择器：2024-10
   * */
  YEAR_MONTH = "year-month",
  /**
   * 月日选择器：08-10
   * */
  MONTH_DAY = "month-day",
  /**
   * 时分选择器：10:59
   * */
  HOUR_MINUTE = "hour-minute",
  /**
   * 分秒选择器：02:10
   * */
  MINUTE_SECOND = "minute-second"
}

/**
 * @description 日期展示的格式
 * */
export enum DateModeEnum {
  /**
   * 年月日时分秒格式：2024-10-10 10:10:11
   * */
  DATETIME = "datetime",
  /**
   * 日期选择器：2024-10-10
   * */
  DATE = "date",
  /**
   * 时间选择器：10:10
   * */
  TIME = "time",
  /**
   * 年月选择器：2024-10
   * */
  YEAR_MONTH = "year-month",
  /**
   * 月日选择器：08-10
   * */
  MONTH_DAY = "month-day",
  /**
   * 时分选择器：10:59
   * */
  HOUR_MINUTE = "hour-minute",
  /**
   * 分秒选择器：02:10
   * */
  MINUTE_SECOND = "minute-second"
}
