// import { sso } from './sso'
import { Message } from 'element-ui'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

const envConfig: any = {
  'dev-mock': {
    env: 'dev',
    baseURL: '/'
  },
  development: {
    baseURL: '/'
  },
  dev: {
    baseURL: ''
  },
  // 'dev' : {
  //   baseURL: ''
  // },
  test: {
    baseURL: ''
  },
  staging: {
    baseURL: ''
  },
  production: {
    baseURL: ''
  }
}

const env: string = process.env.VUE_APP_ENV || 'dev-mock'
const baseURL = envConfig[env].baseURL

export const config: AxiosRequestConfig = {
  baseURL,
  // timeout: 60000,
  timeout: 300000,
  headers: {
    ['x-requested-with']: 'XMLHttpRequest',
    ['Cache-Control']: 'no-cache',
    ['Content-Type']: 'application/x-www-form-urlencoded'
  },
  validateStatus() {
    return true
  },
  responseType: 'json' // default
}
const instance: AxiosInstance = axios.create(config)

// 请求拦截器，可以在这里对请求做一些通用处理，比如添加通用请求头等
instance.interceptors.request.use((req: AxiosRequestConfig) => {
  return req
})

// 返回体拦截器，可以在这里对返回体做通用的验证、处理
instance.interceptors.response.use((res: AxiosResponse) => {
  const conf: any = res.config
  // 返回401，表示sso凭证已过期，需要退出登录，重新登录
  if (res.status !== 200) {
    if (!conf.noToast) {
      if(res.data && res.data.message) {
        Message({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: `${res.data.message}`
        })
        throw new Error(res.data.message)
      }
      Message({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: `<div>接口:${res.request.responseURL}</div>
          <div>状态码: ${res.status}</div>
          <div>提示信息: ${res.statusText}</div>`
      })
    }
    throw new Error(res.statusText)
  }

  if (res.data.code !== 0) {
    if (!conf.noToast) {
      Message({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: `${res.data.message}`
      })
    }

    return res.data
  }
  return res
})

export default instance
