import { buildProp, buildProps, definePropType } from '@/utils/props'

import { VERTICAL } from './defaults'
import type { ItemSize } from './types'
import type { ExtractPropTypes, StyleValue } from 'vue'

const itemSize = buildProp({
  type: definePropType<number | ItemSize>([Number, Function]),
  required: true,
} as const)

const estimatedItemSize = buildProp({
  type: Number,
} as const)

const cache = buildProp({
  type: Number,
  default: 2,
} as const)

const direction = buildProp({
  type: String,
  values: ['ltr', 'rtl'],
  default: 'ltr',
} as const)

const initScrollOffset = buildProp({
  type: Number,
  default: 0,
} as const)

const total = buildProp({
  type: Number,
  required: true,
} as const)

const layout = buildProp({
  type: String,
  values: ['horizontal', 'vertical'],
  default: VERTICAL,
} as const)

export const virtualizedProps = buildProps({
  className: {
    type: String,
    default: '',
  },

  containerElement: {
    type: definePropType<string | Element>([String, Object]),
    default: 'div',
  },

  data: {
    type: definePropType<any[]>(Array),
    default: () => [] as any[],
  },

  /**
   * @description 控制水平方向
   */
  direction,

  height: {
    type: [String, Number],
    required: true,
  },

  innerElement: {
    type: [String, Object],
    default: 'div',
  },

  style: {
    type: definePropType<StyleValue>([Object, Array, String]),
  },

  useIsScrolling: {
    type: Boolean,
    default: false,
  },

  width: {
    type: [Number, String],
    required: true,
  },

  perfMode: {
    type: Boolean,
    default: true,
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
})

export const virtualizedListProps = buildProps({
  /**
   * @description 描述应该将多少项预渲染到头部
   * 和窗户的尾巴
   */
  cache,
  estimatedItemSize,

  /**
   * @description 控制列表的方向
   */
  layout,
  initScrollOffset,

  /**
   * @description 描述列表的总数
   */
  total,
  itemSize,
} as const)

export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
