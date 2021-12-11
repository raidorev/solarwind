<script lang="ts" setup>
import { useConfig } from 'solarwind/composables/config'
import type { SolarwindConfig } from 'solarwind/types'

type Props = {
  config: SolarwindConfig
}
const props = defineProps<Props>()

useConfig(props.config)
</script>

<template>
  <slot />
</template>
