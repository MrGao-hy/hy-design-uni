import type { App } from "vue";
import { addUnit, bytesToSize, formatTime, random } from "../../libs";
export default function registerProperties(app: App) {
  app.config.globalProperties.$hy = {
    /**
     * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
     * @param {String|Number} value 需要添加单位的值
     * @param {String} unit 添加的单位名 比如px
     * @returns {String}
     */
    addUnit: (value: string | number, unit: string): string =>
      addUnit(value, unit),
    /**
     * 获取 [min,max]的随机数
     * Math.floor(Math.random()*10) 可均衡获取 0 到 9 的随机整数
     * @param min 最小值
     * @param max 最大值
     * @returns {Number} 随机数
     */
    random: (min: string | number, max: string | number): number =>
      random(min, max),
    /**
     * 时间戳转换成字符串
     * @param timestamp 时间戳或者时间格式，例:1702051200000、Sat Apr 06 2024 11:35:56 GMT+0800 (中国标准时间)
     * @param fmt 例:YYYY-mm-dd HH:MM:SS / YYYY-mm-dd
     * @returns {String} date 例:2023-12-09
     */
    formatTime: (timestamp: string, fmt: string): string =>
      formatTime(timestamp, fmt),
    /**
     * 字节转化（b/KB/MB/GB）单位
     * @param {Number} bytes 字节
     * @returns {String} 返回单位大小
     * */
    bytesToSize: (bytes: number): string => bytesToSize(bytes),
  };
}
