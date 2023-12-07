<template>
  <template v-for="obj in routers">
    <el-sub-menu v-if="obj?.children?.length" :key="obj.path" :index="obj.path">
      <template #title> {{ obj.name }} </template>
      <el-menu-item-group :title="obj.name">
        <SidebarItem :routers="obj.children" />
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item v-else :key="obj.path" :index="obj.path">
      <template #title>{{ obj.name }} </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { AppRouteRecordRaw } from '@/router/types'

import type { PropType } from 'vue'

defineOptions({
  name: 'SidebarItem',
})

const props = defineProps({
  routers: {
    type: Array as PropType<AppRouteRecordRaw[]>,
    default: () => [],
  },
})
</script>

<style scoped lang="scss"></style>
