import { objectToUrlParams } from '../../libs'

export class Http {
    /**
     * 默认请求配置
     */
    config: HyHttps.HttpRequestConfig = {
        baseURL: '',
        url: '',
        data: {},
        dataType: 'json',
        header: {},
        method: 'POST',
        responseType: 'text',
        timeout: 10000
    }

    /* 私有回调槽 */
    private _requestHook?: (conf: UniNamespace.RequestOptions) => UniNamespace.RequestOptions
    private _responseSuccessHook?: (res: UniNamespace.RequestSuccessCallbackResult) => any
    private _responseFailHook?: (err: UniNamespace.GeneralCallbackResult) => any

    /**
     * @description 拦截器
     */
    interceptor = {
        /**
         * @description 请求拦截 请求配置
         * @param hook
         */
        request: (hook: (conf: UniNamespace.RequestOptions) => UniNamespace.RequestOptions) => {
            this._requestHook = hook
        },
        /**
         * @description 响应拦截
         * @param success 成功响应
         * @param fail 失败响应
         */
        response: (
            success?: (response: UniNamespace.RequestSuccessCallbackResult) => any,
            fail?: (error: UniNamespace.GeneralCallbackResult) => any
        ) => {
            if (success) {
                this._responseSuccessHook = success
            }
            if (fail) {
                this._responseFailHook = fail
            }
        }
    }

    /**
     * @description 请求拦截
     * @param conf 请求配置
     */
    private requestBefore(conf: UniNamespace.RequestOptions): UniNamespace.RequestOptions {
        return this._requestHook ? this._requestHook(conf) : conf
    }

    /**
     * @description uni异步请求
     * @param options 请求配置
     */
    async request<T = any>(options: UniNamespace.RequestOptions): Promise<T> {
        options.url = this.config.baseURL + options.url || this.config.url
        options.data = options.data || this.config.data
        options.header = options.header || this.config.header
        options.method = options.method || this.config.method
        options.responseType = options.responseType || this.config.responseType
        options.timeout = options.timeout || this.config.timeout
        /* 合并默认配置 ... */
        return new Promise((resolve, reject) => {
            options = this.requestBefore(options) // ⭐这里会调用钩子
            uni.request({
                ...options,
                success: (res: UniNamespace.RequestSuccessCallbackResult) => {
                    const after = this._responseSuccessHook ? this._responseSuccessHook(res) : res
                    resolve(after)
                },
                fail: (err: UniNamespace.GeneralCallbackResult) => {
                    const after = this._responseFailHook ? this._responseFailHook(err) : err
                    reject(after)
                }
            })
        })
    }

    /**
     * post请求
     * @param url 请求地址
     * @param params 请求JSON参数
     * @param options 请求配置
     */
    post<T = any>(url: string, params?: any, options?: HyHttps.HttpRequestConfig): Promise<T> {
        return this.request({
            url: url,
            method: 'POST',
            data: params,
            ...options
        })
    }

    /**
     * get请求
     * @param url 请求地址
     * @param params URL查询参数
     * @param options 请求配置
     */
    get<T = any>(url: string, params?: any, options?: HyHttps.HttpRequestConfig): Promise<T> {
        if (params) {
            url += '?' + objectToUrlParams(params)
        }
        return this.request({
            url: url,
            method: 'GET',
            ...options
        })
    }
}
