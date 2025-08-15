import type {
  HttpRequestConfig,
  HttpInterceptorManager,
  HttpResponse,
} from "../typing";
import { objectToUrlParams } from "../utils";

export default class Http {
  /**
   * 默认请求配置
   */
  config: HttpRequestConfig = {
    baseURL: "",
    url: "",
    data: {},
    dataType: "json",
    header: {},
    method: "POST",
    responseType: "text",
    timeout: 10000,
  };

  /**
   * @description 拦截器
   */
  interceptor = {
    /**
     * @description 请求拦截 请求配置
     * @param config
     */
    request: (config: HttpRequestConfig) => {
      if (config) {
        this.requestBefore(config);
      }
    },
    /**
     * @description 响应拦截
     * @param success 成功响应
     * @param fail 失败响应
     */
    response: (
      success: (response: HttpResponse) => any,
      fail: (error: HttpResponse) => any,
    ) => {
      if (success) {
        this.responseSuccess = success;
      }
      if (fail) {
        this.responseFail = fail;
      }
    },
  };

  /**
   * @description 请求拦截
   * @param config 请求配置
   */
  requestBefore(config: HttpRequestConfig) {
    return config;
  }

  /**
   * @description 成功响应
   * @param response
   */
  responseSuccess(response: UniNamespace.RequestSuccessCallbackResult) {
    return response;
  }

  /**
   * @description 失败响应
   * @param response
   */
  responseFail(response: UniNamespace.GeneralCallbackResult) {
    return response;
  }

  /**
   * @description uni异步请求
   * @param options 请求配置
   */
  async request(options: Record<string, any>) {
    options.url = this.config.baseURL + options.url || this.config.url;
    options.data = options.data || this.config.data;
    options.header = options.header || this.config.header;
    options.method = options.method || this.config.method;
    options.responseType = options.responseType || this.config.responseType;
    options.timeout = options.timeout || this.config.timeout;
    return new Promise<any>((resolve, reject) => {
      options = this.requestBefore(options);
      uni.request({
        url: options.url,
        data: options.data,
        header: options.header,
        method: options.method,
        timeout: options.timeout,
        success: (response: UniNamespace.RequestSuccessCallbackResult) => {
          resolve(this.responseSuccess(response));
        },
        fail: (error: UniNamespace.GeneralCallbackResult) => {
          reject(this.responseFail(error));
        },
      });
    });
  }

  /**
   * post请求
   * @param url 请求地址
   * @param params 请求JSON参数
   * @param options 请求配置
   */
  post(url: string, params?: any, options?: Record<string, any>) {
    return this.request({
      url: url,
      method: "POST",
      data: params,
      ...options,
    });
  }

  /**
   * get请求
   * @param url 请求地址
   * @param params URL查询参数
   * @param options 请求配置
   */
  get(url: string, params?: any, options?: Record<string, any>) {
    if (params) {
      url += "?" + objectToUrlParams(params);
    }
    return this.request({
      url: url,
      method: "GET",
      ...options,
    });
  }
}
