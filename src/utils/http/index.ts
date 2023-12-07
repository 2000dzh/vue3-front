import { clone } from 'lodash-es'

import { deepMerge } from '@/utils'

import { ContentTypeEnum } from '@/enums/httpEnum'

import { VAxios } from './Axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import type { RequestOptions } from '#/axios'
import type { AxiosResponse } from 'axios'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook(config, options) {
    return config
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        transform: clone(transform),
        timeout: 10 * 1000,
        headers: ContentTypeEnum.JSON,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {},
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios()
