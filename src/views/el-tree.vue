<template>
  <DefineTemplate v-slot="{ $slots }">
    <div v-if="$slots.default" some-layout>
      <!-- To render the slot -->
      <component :is="$slots.default" />
    </div>
  </DefineTemplate>
  <ReuseTemplate>
    <div>Some content</div>
    <div>Some content</div>
  </ReuseTemplate>
  <ReuseTemplate>
    <div>Another content</div>
  </ReuseTemplate>

  <Login />
</template>
<script lang="ts" setup>
// import { ElTreeV2 } from 'element-plus'
// import { useCompRef } from '../utils'
import { createReusableTemplate } from '@vueuse/core'

import Login from './login/index.vue'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>
