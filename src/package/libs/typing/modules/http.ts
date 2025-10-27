export interface HttpRequestConfig extends UniNamespace.RequestOptions {
  /** 请求基地址 */
  baseURL?: string;
}

export interface HttpResponse<T = any> {
  config: HttpRequestConfig;
  statusCode: number;
  cookies: Array<string>;
  data: T;
  errMsg: string;
  header: AnyObject;
}

export interface HttpInterceptorManager<V, E = V> {
  onFulfilled?: (config: V) => Promise<V> | V;
}
