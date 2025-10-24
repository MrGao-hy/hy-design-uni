import type ToastOptions from "../components/hy-toast/typing";
import { error } from "../utils";

// 用于缓存全局唯一实例
let toastInstance: any = null;

/**
 * useToast 适用于任意页面直接调用 toast
 * 兼容 H5 + 微信小程序 + App
 */
export const useToast = () => {
  // 如果已经有实例，直接复用
  if (toastInstance) return toastInstance;

  const info = (msg: string, opt?: ToastOptions) =>
    createToast({ message: msg, type: "info", ...opt });
  const success = (msg: string, opt?: ToastOptions) =>
    createToast({ message: msg, type: "success", ...opt });
  const error = (msg: string, opt?: ToastOptions) =>
    createToast({ message: msg, type: "error", ...opt });
  const warning = (msg: string, opt?: ToastOptions) =>
    createToast({ message: msg, type: "warning", ...opt });
  const primary = (msg: string, opt?: ToastOptions) =>
    createToast({ message: msg, type: "primary", ...opt });
  const loading = (msg: string = "加载中...", opt?: ToastOptions) =>
    createToast({ message: msg, loading: true, ...opt });
  const close = (all?: boolean) => {
    if (toastInstance && toastInstance.hide) toastInstance.hide();
  };

  return { info, success, error, warning, primary, loading, close };
};

/**
 * ✅ 实现
 * 由于小程序不支持动态 mount vue 组件
 * 所以需要依赖页面上放置 <HyToast ref="toastRef" /> 元素
 */
function createToast(options: ToastOptions) {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const vm = currentPage.$vm || currentPage;

  // 确保页面有 ref="toastRef" 的 hy-toast
  if (vm?.$refs?.toastRef) {
    vm.$refs.toastRef.show(options);
    toastInstance = vm.$refs.toastRef;
  } else {
    error('[useToast] 请在页面 template 中添加 <HyToast ref="toastRef" />');
  }
}
