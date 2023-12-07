<template>
  <el-container class="main">
    <el-aside width="200px">
      <Sider />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sider from './sider/index.vue'

defineOptions({
  name: 'Layouts',
})

</script>

<style scoped lang="scss">
.main {
  height: 100%;
  .content-left {
    width: 200px;
    height: 100%;
    background-color: pink;
  }
  .content-right {
    width: calc(100% - 200px);
    height: 100%;
    background-color: red;
  }
}
</style>
