import type { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { RequestOptions, Result } from '#/axios'
import type { CreateAxiosOptions } from './axiosTransform'
import { AxiosCanceler } from './axiosCancel'
import axios from 'axios'
import { cloneDeep } from 'lodash-es'
import { isFunction } from '@/utils/is'

export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description:  拦截器配置
   */
  private setupInterceptors() {
    const {
      axiosInstance,
      options: { transform },
    } = this
    if (!transform) {
      return
    }

    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform
    const axiosCanceler = new AxiosCanceler()

    // 请求拦截器配置
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      (error) => {
        if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
          return requestInterceptorsCatch(error)
        }
        return Promise.reject(error)
      }
    )

    // 响应拦截器设置
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        // 可以设置取消请求
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res)
        }
        return res
      },
      (error) => {
        if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
          return responseInterceptorsCatch(error)
        }
        return Promise.reject(error)
      }
    )
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
    if (config.cancelToken) {
      conf.cancelToken = config.cancelToken
    }

    const transform = this.getTransform()
    const { beforeRequestHook } = transform || {}
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosRequestConfig<Result>>(conf)
        .then((res: AxiosRequestConfig<Result>) => {
          resolve(res as Promise<T>)
        })
        .catch((error: Error | AxiosError) => {
          reject(error)
        })
    })
  }
}
