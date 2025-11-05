import Base64 from "./base64";
import type { CSSProperties } from "vue";
import { error, isNumber } from "./index";
let base64: any = new Base64();

/**
 * 加密函数
 * @param {any} data 对象
 * @return { string } 加密字符串
 * */
function encryptData(data: Record<string, any> | string): string {
  return base64.encode(JSON.stringify(data));
}

/**
 * 解密函数
 * @param {string} encryptedVal 加密字符串
 * @returns { any | any[] } 解码的数据
 * */
function decryptData(encryptedVal: string): Record<string, any> {
  return JSON.parse(base64.decode(encryptedVal.toString()));
}

/**
 *用于解密使用 AES 加密算法加密的数据
 */

// const decrypt = (sessionKey: string, encryptedData: string, iv: string) => {
//     console.log(CryptoJS)
//     let key = CryptoJS.enc.Base64.parse(sessionKey)
//     let ivv = CryptoJS.enc.Base64.parse(iv)
//     let decrypt = CryptoJS.AES.decrypt(encryptedData, key,  {
//         iv: ivv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return JSON.parse(base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
// }

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {String|Number} value 需要添加单位的值
 * @param {String} unit 添加的单位名 比如px
 * @returns {String}
 */
const addUnit = (
  value: string | number = "auto",
  unit: string = "",
): string => {
  if (!unit) {
    unit = "px";
  }
  if (unit == "rpx" && isNumber(String(value))) {
    value = Number(value) * 2;
  }
  value = String(value);
  // 用内置验证规则中的number判断是否为数值
  return isNumber(value) ? `${value}${unit}` : value;
};

/**
 * @description 日期的月或日补零操作
 * @param {String | Number} value 需要补零的值
 * @returns {String}
 */
const padZero = (value: string | number): string => {
  return `00${value}`.slice(-2);
};

/**
 * @description 后面补零
 * @param {String | Number} value 需要补零的值
 * @param {Number} length 多少位
 * @returns {String}
 */
const addZero = (value: string | number, length: number): string => {
  if (value === undefined || value === null) return "";
  let val = value.toString();
  if (length > val.length) {
    val += "0".repeat(length - val.length);
  } else {
    val = val.slice(0, length);
  }
  return val;
};

/**
 * @description 清空对象里面的值
 * @param val 任意类型的值
 * */
const clearVal = (val: any) => {
  const type = typeof val;
  const isArray = val instanceof Array;
  switch (type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "undefined":
      return null;
    case "object":
      if (!val) return null;
      if (isArray) {
        val.map((item) => {
          clearVal(item);
        });
        return val;
      } else {
        Object.keys(val).map((k) => {
          val[k] = clearVal(val[k]);
        });
        return val;
      }
    default:
      return "";
  }
};

/**
 * 时间戳格式化
 * @param timestamp 时间戳或者时间格式，例:1702051200000、Sat Apr 06 2024 11:35:56 GMT+0800 (中国标准时间)
 * @param fmt 例:yyyy-MM-dd HH:mm:ss / yyyy-MM-dd
 * @return date 例:2023-12-09
 */
const formatTime = (
  timestamp: number | string,
  fmt: string = "yyyy-MM-dd HH:mm:ss",
): string => {
  let date: any;
  if (timestamp) {
    date = new Date(timestamp) ? new Date(timestamp) : timestamp;
    let ret;
    const opt: any = {
      "y+": date.getFullYear().toString(), //年
      "M+": (date.getMonth() + 1).toString(), //月
      "d+": date.getDate().toString(), //日
      "H+": date.getHours().toString(), //时
      "m+": date.getMinutes().toString(), //分
      "s+": date.getSeconds().toString(), //秒
      //如果有其他格式字符需求可以继续添加，必须转化为字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"),
        );
      }
    }
    return fmt;
  }
  return date;
};

/**
 * @description 时间戳或年月日格式转为多久之前
 * @param {String|Number} timestamp 时间戳/年月日格式
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
const formatTimeToString = (
  timestamp: string | number,
  format: string | boolean = "yyyy-mm-dd",
): string => {
  const now = new Date();
  const oneYear = new Date(now.getFullYear(), 0, 1).getTime(); // 当年一月一号时间戳

  if (timestamp == null) timestamp = Number(now);
  timestamp =
    typeof timestamp === "string"
      ? parseInt(timestamp)
      : new Date(timestamp).getTime();
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  let timer = now.getTime() - timestamp;
  timer = parseInt(String(timer / 1000));
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = "";
  switch (true) {
    case timer < 300:
      tips = "刚刚";
      break;
    case timer >= 300 && timer < 3600:
      tips = `${parseInt(String(timer / 60))}分钟前`;
      break;
    case timer >= 3600 && timer < 86400:
      tips = `${parseInt(String(timer / 3600))}小时前`;
      break;
    case timer >= 86400 && timer < 2592000:
      tips = `${parseInt(String(timer / 86400))}天前`;
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = `${parseInt(String(timer / (86400 * 30)))}个月前`;
        } else {
          tips = `${parseInt(String(timer / (86400 * 365)))}年前`;
        }
      } else {
        if (timestamp > oneYear) {
          formatTime(timestamp, "MM-dd");
        } else {
          tips =
            format === true
              ? formatTime(timestamp, "yyyy-MM-dd")
              : formatTime(timestamp, format);
        }
      }
  }
  return tips;
};

/**
 * @description 本地图片转base64方法（兼容APP、H5、小程序）
 * @param {string} path 图片本地路径
 * @returns Promise对象
 */
const imageToBase64 = (path: string) => {
  return new Promise((resolve, reject) => {
    // #ifdef APP-PLUS
    plus.io.resolveLocalFileSystemURL(path, (entry: any) => {
      entry.file((file: any) => {
        let fileReader = new plus.io.FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = (evt: any) => {
          let base64 = evt.target.result.split(",")[1];
          resolve(base64);
        };
      });
    });
    // #endif
    // #ifdef H5
    uni.request({
      url: path,
      responseType: "arraybuffer",
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        resolve(uni.arrayBufferToBase64(res.data as ArrayBuffer));
      },
    });
    // #endif
    // #ifdef MP-WEIXIN
    uni.getFileSystemManager().readFile({
      filePath: path,
      encoding: "base64",
      success: (res) => {
        resolve(res.data);
      },
    });
    // #endif
  });
};

/**
 * 函数防抖：一段实现执行多次，只执行最后一次
 * @param {void} fn 回调函数
 * @param {number} wait 节流时间
 * @returns {void}
 * @constructor
 */
let timeout: ReturnType<typeof setTimeout> | null = null;
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 500,
  immediate: boolean = false,
) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) typeof fn === "function" && fn();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof fn === "function" && fn();
    }, wait);
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;
let flag: boolean | undefined;
/**
 * 函数节流: 一段时间执行一次
 * @param {void} fn 回调函数
 * @param {number} wait 节流等待时间
 * @param {boolean} immediate 是否立马执行
 * @returns {void}
 * @constructor
 */
const throttle = (
  fn: Function,
  wait: number = 500,
  immediate: boolean = true,
): void => {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof fn === "function" && fn();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof fn === "function" && fn();
    }, wait);
  }
};

/**
 * 递归拷贝对象
 * @param {object} source 对象或数组
 * @returns 深拷贝的数组和对象
 * */
const deepClone = (source: any) => {
  if (!source && typeof source !== "object") {
    throw new Error("该值不存在或者不是个对象");
  }
  const targetObj: any = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
};

/**
 * 字节转化（b/KB/MB/GB）单位
 * @param {number} bytes 字节
 * @returns {string} 返回单位大小
 * */
const bytesToSize = (bytes: number) => {
  const sizes = ["b", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "0b";
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i === 0) {
    return `${bytes}${sizes[i]}`;
  }
  return `${(bytes / 1024 ** i).toFixed(1)}${sizes[i]}`;
};

/**
 * @description 将对象转换为 URL 查询参数字符串
 * @param params - 要转换的对象
 * @returns 转换后的查询参数字符串
 */
const objectToUrlParams = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== null) // 过滤掉值为 undefined 或 null 的项
    .map(([key, value]) => {
      // 对值进行编码以确保 URL 安全
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&"); // 使用 & 拼接所有参数
};

/**
 * @description  地址栏参数转换对象
 * @param paramStr - 字符串参数
 * @returns 返回转换对象
 */
const urlParamsToObject = (paramStr: string): AnyObject => {
  const params: AnyObject = {};
  // 去掉字符串两端的可能的空格
  paramStr = paramStr.trim();
  // 如果字符串以?开头，去掉它
  if (paramStr.startsWith("?")) {
    paramStr = paramStr.substring(1);
  }
  // 按&分割字符串，得到键值对数组
  const pairs = paramStr.split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    // 按=分割键值对
    const [key, ...valueParts] = pair.split("=");
    const value = valueParts.join("=");
    // 将键值对存入对象
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return params;
};

/**
 * 获取 [min,max]的随机数
 * Math.floor(Math.random()*10) 可均衡获取 0 到 9 的随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns {Number} string 随机数
 */
const random = (min: number | string, max: number | string): number => {
  min = Number(min);
  max = Number(max);
  return Math.floor(Math.random() * (max - min + 1) + min) || 0;
};

const range = (min = 0, max = 0, value = 0) => {
  return Math.max(min, Math.min(max, Number(value)));
};

export type RectResultType<T extends boolean> = T extends true
  ? UniApp.NodeInfo[]
  : UniApp.NodeInfo;
/**
 * 查询节点信息
 * 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
 * 解决办法为在组件根部再套一个没有任何作用的view元素
 * @param selector 元素类名或id
 * @param all 是否获取多个相同元素数值
 * @param ins 在微信小程序里，因为utils文件里面获取不到instance值所以必须通过ins这个传过来【注意，（支付宝小程序无效）】
 * @param useFields 是否使用 fields 方法获取节点信息
 */
const getRect = <T extends boolean>(
  selector: string,
  all?: T,
  ins?: any,
  useFields?: boolean,
): Promise<RectResultType<T>> => {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    let query: UniNamespace.SelectorQuery | null = null;
    if (ins) {
      // TODO: 在微信小程序里，因为utils文件里面获取不到instance值所以必须通过ins这个传过来
      query = uni.createSelectorQuery().in(ins);
    } else {
      query = uni.createSelectorQuery();
    }
    const method = all ? "selectAll" : "select";

    const callback = (rect: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
      if (all && Array.isArray(rect) && rect.length > 0) {
        resolve(rect as RectResultType<T>);
      } else if (!all && rect) {
        resolve(rect as RectResultType<T>);
      } else {
        error(`调用getRect方法，没有找到${selector}对应的元素内容`);
        reject(new Error("No nodes found"));
      }
    };

    if (useFields) {
      query[method](selector)
        .fields({ size: true, node: true }, callback)
        .exec();
    } else {
      query[method](selector).boundingClientRect(callback).exec();
    }
  });
};

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.rpx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value: string | number, unit: true): string;
function getPx(value: string | number, unit?: false): number;
function getPx(value: string | number, unit: boolean = false): string | number {
  if (isNumber(value) || typeof value === "number") {
    return unit ? `${value}px` : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit
      ? `${uni.rpx2px(parseInt(value))}px`
      : Number(uni.rpx2px(parseInt(value)));
  } else if (/(px)$/.test(value)) {
    return unit ? value : Number(value.replace("px", ""));
  } else {
    return unit ? `${parseInt(value)}px` : Number(value);
  }
}

/**
 * @description 对象转换字符串，用在于style样式上
 * */
const formatObject = (obj: CSSProperties) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
    .join("; ");
};

export {
  encryptData,
  decryptData,
  addUnit,
  padZero,
  addZero,
  clearVal,
  formatTime,
  formatTimeToString,
  imageToBase64,
  debounce,
  throttle,
  deepClone,
  bytesToSize,
  objectToUrlParams,
  urlParamsToObject,
  random,
  range,
  getRect,
  getPx,
  formatObject,
};
