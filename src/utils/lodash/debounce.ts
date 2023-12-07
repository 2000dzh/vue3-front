import { isObject } from '../is'

type Callback<T extends any[] = any[]> = (...args: T) => void

interface DebounceOptions {
  maxWait?: number
  leading?: Boolean // 第一次调用是否立即执行函数
  trailing?: Boolean // 最后一次调用是否立即执行函数
}

/**
 * @description 防抖函数
 * @param func 要防抖的函数
 * @param wait 延迟的毫秒数
 * @param options 配置项
 */
export function myDebounceM<T extends any[]>(func: Callback<T>, wait: number, options?: DebounceOptions) {
  let leading = false
  let trailing = true
  let timerId: undefined | number
  let lastThis: any
  let result: any

  if (isObject(options)) {
    leading = Object.hasOwn(options, 'leading') ? !!options.leading : leading
    trailing = Object.hasOwn(options, 'trailing') ? !!options.trailing : trailing
  }

  function debounce(this: any, ...args: T) {
    lastThis = this

    if (leading && !timerId) {
      const context = lastThis
      lastThis = undefined
      result = func.apply(context, args)
    }

    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (trailing && lastThis) {
        result = func.apply(lastThis, args)
      }
      clearTimeout(timerId)
      timerId = undefined
    }, wait)

    return result
  }

  return debounce
}

// 只实现 leading  trailing
export function miniDebounce<T extends any[]>(func: Callback<T>, wait: number, options?: DebounceOptions) {
  let timeoutId: number | undefined
  let leading = false
  let trailing = true
  let lastThis: any

  if (isObject(options)) {
    leading = Object.hasOwn(options, 'leading') ? !!options.leading : leading
    trailing = Object.hasOwn(options, 'trailing') ? !!options.trailing : trailing
  }

  function debounce(this: any, ...args: T) {
    lastThis = this

    // 是否需要立即执行
    if (leading && !timeoutId) {
      const context = lastThis
      lastThis = undefined
      func.apply(context, args)
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // 是否需要在最后一次调用后执行
      if (trailing && lastThis) {
        func.apply(lastThis, args)
      }

      clearTimeout(timeoutId)
      timeoutId = undefined
    }, wait)
  }

  return debounce
}


