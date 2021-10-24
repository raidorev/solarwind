<script lang="ts" setup>
import { useTheme } from 'solarwind/composables/theme'

type Props = {
  theme: string
}
const props = defineProps<Props>()

useTheme(props.theme)
</script>

<template>
  <slot />
</template>
