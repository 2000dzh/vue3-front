import { treeProps } from './virtual-tree'
import type { ExtractPropTypes } from 'vue'

export type TreeNodeData = Record<string, any>

export type TreeData = TreeNodeData[]

export type TreeKey = string | number

export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface TreeNode {
  key: TreeKey
  level: number
  parent?: TreeNode
  children: TreeNode[]
  data: TreeNodeData
  disabled: boolean
  lable: string
  isLeaf: boolean
}
