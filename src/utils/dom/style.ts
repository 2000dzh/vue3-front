import { camelize } from 'vue'

import { isNumber, isObject, isString } from '../is'
import { entriesOf, keysOf } from '../objects'
import type { CSSProperties } from 'vue'

export const classNameToArray = (cls = '') => {
  return cls.split(' ').filter((item) => !!item.trim())
}

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) {
    return false
  }
  if (cls.includes(' ')) {
    throw new Error('className should not contain space.')
  }
  return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) {
    return
  }
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) {
    return
  }
  el.classList.remove(...classNameToArray(cls))
}

export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
  if (!element || !styleName) {
    return ''
  }
  // fontSize => font-size
  let key = camelize(styleName)
  // 因为 float 是 JavaScript 的保留字
  if (key === 'float') key = 'cssFloat'
  try {
    // 如果元素存在内联样式,直接返回
    const style = (element.style as any)[key]
    if (style) return style
    // 返回计算样式的值
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    // 如果获取计算样式出现错误(元素被隐藏或已经删除),直接返回内联样式
    return (element.style as any)[key]
  }
}

// export const setStyle = (element: HTMLElement, styleName: CSSProperties | keyof CSSProperties, value?: string | number) => {
//   if (!element || !styleName) {
//     return
//   }

//   if (isObject(styleName)) {
//     entriesOf(styleName).forEach(([prop, value]) => setStyle(element, prop, value))
//   } else {
//     const key: any = camelize(styleName)
//     element.style[key] = value as any
//   }
// }

// export const removeStyle = (element: HTMLElement, style: CSSProperties | keyof CSSProperties) => {
//   if (!element || !style) {
//     return
//   }

//   if (isObject(style)) {
//     keysOf(style).forEach((prop) => removeStyle(element, prop))
//   } else {
//     setStyle(element, style, '')
//   }
// }

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }
}
