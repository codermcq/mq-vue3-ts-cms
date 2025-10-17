// 针对AxiosRequestConfig配置进行扩展
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'

export interface MQInterceptors {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}

export interface MQRequestConfig extends AxiosRequestConfig {
  interceptors?: MQInterceptors
}
