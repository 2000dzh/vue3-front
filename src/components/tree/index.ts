import myTree from './src/tree.vue'

import type { App } from 'vue'

myTree.install = (app: App): void => {
  app.component(myTree.name, myTree)
}

const _MyTree = myTree

export default _MyTree
export const MyTree = _MyTree
