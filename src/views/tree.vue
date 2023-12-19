<template>
  <div>
    <tree @node-click="nodeClick" />
    <tree v-on:node-click="nodeClick" />
    <tree :onNodeClick="nodeClick" />
    <tree v-bind:on-node-click="nodeClick" />

    <el-radio-group v-model="radio1" @change="changeAddress">
      <div v-for="(obj, index) in list" :key="index">
        <el-radio :label="obj.id" size="large">{{ obj.name }}</el-radio>
      </div>
    </el-radio-group>
    <el-button @click="fn">测试</el-button>
  </div>
</template>

<script setup lang="ts">
import tree from './el-tree.vue'

const radio1 = ref(null)

const list = ref(
  Array.from({ length: 2 }, function (item, index) {
    return {
      name: `测试${index + 1}`,
      id: index + 1,
    }
  }),
)

const nodeClick = (val: any) => {
  console.log('订阅', val)
}

const fn = () => {
  const len = list.value.length + 1
  const arr = [...list.value]
  arr.unshift({
    name: `测试${len}`,
    id: len,
  })
  list.value = [...arr]
}

const changeAddress = (val: any) => {
  // list.filter((item) => item.id === val)
  console.log(val)
}
</script>

<style scoped lang="scss">
.btn-box {
  width: 200px;
  height: 120px;
  background-color: pink;
}
</style>
