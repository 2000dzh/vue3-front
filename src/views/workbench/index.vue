<template>
  <div>workbenc1h</div>
  <div>{{ num }}</div>
  <el-button @click="fn('1', 2)">测试</el-button>
  <div>{{ num1 }}</div>
  <el-button @click="fn1(1, 2)">测试1</el-button>
</template>

<script setup lang="ts">
import { miniDebounce } from '@/utils/lodash/debounce'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'Workbench',
})
const num = ref(0)
const num1 = ref(0)
function fn11<T>(this: T) {
  console.log(this)
  num.value++
}

const obj = {
  a: 11,
  fn11(...args: any[]) {
    num.value++
  },
}
const fn = miniDebounce<[string, number]>(obj.fn11, 300, { leading: true, })
const fn1 = debounce(obj.fn11, 300, { leading: true })
</script>

<style scoped></style>
