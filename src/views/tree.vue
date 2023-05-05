<template>
  <div>
    <MyTree />
    <tree />
    <div ref="headerRef" class="btn-box">
      <div ref="SdadasdasDsasa">测试</div>
      {{ age }}
      <el-button>点我</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyTree from '@/components/tree'
import tree from './el-tree.vue'
import { useDraggable } from '@/hooks/use-draggable'
const age: any = ref(18)
function fn() {
  age.value += 1
  console.log('12122')
}

const asasd = computed(() => true)

const headerRef = ref<HTMLElement>()
const SdadasdasDsasa = ref<HTMLElement>()
useDraggable(headerRef, SdadasdasDsasa, asasd)
</script>

<style scoped lang="scss">
.btn-box {
  width: 200px;
  height: 120px;
  background-color: pink;
}
</style>
