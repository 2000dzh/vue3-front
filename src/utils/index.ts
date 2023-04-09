import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash-es'
import { isArray, isObject } from './is'
type _obj = object | null | undefined

/**
 * @description 将该对象作为参数添加到URL中
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * @description 递归合并两个对象。
 * @param target 目标对象，合并后结果存放于此。
 * @param source 要合并的源对象。
 * @returns 合并后的对象。
 */
export function deepMerge<T extends _obj, U extends _obj>(target: T, source: U) {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(target) && isObject(source)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        // 如果是数组,进行深度比较去重
        return isArray(prevValue) ? unionWith(prevValue, nextValue, isEqual) : undefined
      })
    }
  })
}
