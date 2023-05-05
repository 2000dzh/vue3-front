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

export function debounce(func: Function, wait: number, options?: Options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || (maxing && timeSinceLastInvoke >= maxWait)
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced  
}
