<template>
  <div class="my-tree">
    <span v-if="isNotEmpty">1</span>
    <div v-else>
      <span>
        {{ emptyText ?? '暂无数据' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTree } from './composables/useTree'
import { treeEmits, treeProps } from './virtual-tree'

defineOptions({
  name: 'MyTree',
})

const props = defineProps(treeProps)
const emits = defineEmits(treeEmits)

const slots = useSlots()

const { isNotEmpty } = useTree(props, emits)

defineExpose({})
</script>

<style scoped lang="scss"></style>
