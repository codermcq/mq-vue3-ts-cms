import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MQRequestConfig } from './type.js'

class MQRequest {
  instance: AxiosInstance

  constructor(config: MQRequestConfig) {
    this.instance = axios.create(config)

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // axios 默认把响应包装在 data、status 等字段，这里直接返回 data 便于调用方使用
        return (res as any).data ?? res
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 针对特定的MQRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // // 封装网络请求方法
  // request(config: MQRequestConfig) {
  //   return new Promise((resolve, reject) => {
  //     this.instance
  //       .request(config)
  //       .then((res) => {
  //         resolve(res)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // }
  request(config: MQRequestConfig) {
    return this.instance.request(config)
  }

  get(config: MQRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config: MQRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config: MQRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config: MQRequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MQRequest
