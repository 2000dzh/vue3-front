import type { VirtualizedListProps } from '../props';
import { virtualizedListProps } from '../props';
import type { ListConstructorProps } from '../types';

const createList = ({
  name,
  getOffset,
  getItemSize,
  getItemOffset,
  getEstimatedTotalSize,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initCache,
  clearCache,
  validateProps,
}: ListConstructorProps<VirtualizedListProps>) => {
  return defineComponent({
    name: name ?? 'VirtualList',
    props: virtualizedListProps,
    setup() {},

    render(ctx: any) {
      return h('div', {}, [])
    },
  })
}

export default createList
