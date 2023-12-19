<template>
  <div>
    <el-button @click="fn">测试</el-button>

    <DefineTemplate v-slot="{ $slots }">
      <div v-if="$slots.default" some-layout>
        <!-- To render the slot -->
        <component :is="$slots.default" />
      </div>
      1
    </DefineTemplate>
    <ReuseTemplate>
      <div>Some content</div>
      <div>Some content</div>
    </ReuseTemplate>
    <ReuseTemplate>
      <div>Another content</div>
    </ReuseTemplate>

    <Login />
  </div>
</template>
<script lang="ts" setup>
import Login from './login/index.vue'

const emit = defineEmits({
  'node-click': (value: any) => value,
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const fn = () => {
  emit('node-click', 66666)
}
</script>
