<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from 'solarwind/composables/theme'

const provider = ref<HTMLDivElement>()

const theme = useTheme(provider)
</script>

<template>
  <div ref="provider" class="h-full">
    <slot :theme="theme" />
  </div>
</template>
