import MQRequest from './request/index.js'
import { BASE_URL, TIME_OUT } from './config/index.js'
import { localCache } from '@/utils/cache.js'
import { LOGIN_TOKEN } from '@/global/constants.js'

const mqRequest = new MQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default mqRequest
