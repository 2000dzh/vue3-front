import type { AxiosRequestConfig } from 'axios'

// 用于存储每个请求的标识和取消函数
const paddingMap = new Map<string, AbortController>()

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  /**
   * @description 添加请求
   * @param config 请求配置
   */
  public addPending(config: AxiosRequestConfig) {}

  /**
   * @description 清除所有等待中的请求
   */
  public removeAllPending() {}

  /**
   * @description 移除请求
   * @param config 请求配置
   */
  public removePending(config: AxiosRequestConfig) {}

  /**
   * @description 重置
   */
  public reset() {
    paddingMap.clear()
  }
}
