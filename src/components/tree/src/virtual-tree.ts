import { buildProps, definePropType } from '@/utils/props/runtime'

import type { TreeData, TreeNode, TreeNodeData } from './types'

// props
export const treeProps = buildProps({
  data: {
    type: definePropType<TreeData>(Array),
    default: () => [],
  },
  emptyText: {
    type: String,
  },
} as const)

// emits
export const NODE_CLICK = 'node-click'

export const treeEmits = {
  [NODE_CLICK]: (data: TreeNodeData, node: TreeNode, e: MouseEvent) =>
    data && node && e,
}
