/**
 * 数据处理类，可根据项目配置
 */
import type { RequestOptions } from '#/axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions // 配置项
}

export abstract class AxiosTransform {
  /**
   * @description: 在发送请求之前调用的函数。它可以根据需要修改请求配置。
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 请求拦截器
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => InternalAxiosRequestConfig

  /**
   * @description: 请求拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 响应拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 响应拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}
