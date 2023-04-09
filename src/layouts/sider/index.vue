<template>
  <div class="sider">
    <div class="dzh-app-logo">
      <img src="" alt="" />
      <span>vue3-front</span>
    </div>
    <el-scrollbar class="content">
      <el-menu :default-openeds="['1', '3']">
        <SidebarItem :routers="routers" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { sidebarRouting } from '@/router/modules'
import type { AppRouteRecordRaw } from '@/router/types'
import SidebarItem from './sidebarItem.vue'

defineOptions({
  name: 'Sider',
})

type siderArr = AppRouteRecordRaw[]
const routers: siderArr = []

function transformArr(arr: siderArr, str: string) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const obj = arr[i]
    // 针对首级特殊处理
    if (obj.redirect && obj?.children?.length && !obj.meta) {
      str = ''
      obj.path = obj.path.replace('/', '')
      transformArr(obj.children, `${str}/${obj.path}`)
      continue
    }
    const path = `${str}/${obj.path}`
    if (obj?.children?.length) {
      const value = recursiveLookup(routers, str)

      if (value) {
        value.children?.push({ ...obj, path, children: [] })
      } else {
        routers.push({ ...obj, path, children: [] })
      }
      transformArr(obj.children, `${str}/${obj.path}`)
    } else {
      const value = recursiveLookup(routers, str)
      if (value) {
        value.children?.push({ ...obj, path })
      } else {
        routers.push({ ...obj, path })
      }
    }
  }
}
// 尾调用优化
function recursiveLookup(arr: siderArr, str: string, index = 0): AppRouteRecordRaw | null {
  if (index >= arr.length) {
    return null
  }
  const obj = arr[index]
  if (obj.path === str) {
    return { ...obj }
  }
  if (obj?.children?.length) {
    const result = recursiveLookup(obj.children, str, 0)
    if (result) {
      return result
    }
  }
  return recursiveLookup(arr, str, index + 1)
}

transformArr(sidebarRouting, '')
</script>

<style scoped lang="scss">
$height: 60px;
.sider {
  width: 100%;
  height: 100%;
  .dzh-app-logo {
    width: 100%;
    display: flex;
    align-items: center;
    height: $height;
    cursor: pointer;
  }
  .content {
    height: calc(100% - $height);
  }
}
</style>
