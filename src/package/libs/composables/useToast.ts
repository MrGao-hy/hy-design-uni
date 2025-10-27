/**
 * 消息提示hooks
 * */

import type ToastOptions from "../../components/hy-toast/typing";
import { error } from "../../libs";

// 用于缓存全局唯一实例
let toastInstance: any = null;

/**
 * useToast 适用于任意页面直接调用 toast
 * 兼容 H5 + 微信小程序 + App
 */
export const useToast = () => {
  const show = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, icon: false, ...opt });
  const info = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, type: "info", ...opt });
  const success = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, type: "success", ...opt });
  const error = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, type: "error", ...opt });
  const warning = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, type: "warning", ...opt });
  const primary = (msg: string, opt?: ToastOptions) =>
    openToast({ message: msg, type: "primary", ...opt });
  const loading = (msg: string = "加载中...", opt?: ToastOptions) =>
    openToast({ message: msg, loading: true, ...opt });
  const close = (all?: boolean) => closeToast();

  return { show, info, success, error, warning, primary, loading, close };
};

/**
 * ✅ 实现
 * 页面创建总事件，调用方法实现
 */
const openToast = (opt: ToastOptions) => {
  uni.$emit("__hy_toast_open__", opt);
};

const closeToast = () => {
  uni.$emit("__hy_toast_close__");
};
