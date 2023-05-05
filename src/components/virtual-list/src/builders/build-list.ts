import type { ListConstructorProps } from '../types'

const createList = ({ name }: ListConstructorProps) => {
  return defineComponent({
    name: name ?? 'VirtualList',
    setup() {},

    render(ctx: any) {
      return h('div', {}, [])
    },
  })
}

export default createList
