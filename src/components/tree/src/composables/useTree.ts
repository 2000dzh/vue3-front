import type { TreeProps } from '../types'
import type { treeEmits } from '../virtual-tree'
import type { SetupContext } from 'vue'


export function useTree(
  props: TreeProps,
  emit: SetupContext<typeof treeEmits>['emit'],
) {
  console.log(props)
  console.log(emit)
  const isNotEmpty = computed(() => false)
  return {
    isNotEmpty,
  }
}
