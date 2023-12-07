<template>
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
</template>
<script lang="ts" setup>
// import { useCompRef } from '../utils'

import Login from './login/index.vue'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>
