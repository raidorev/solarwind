<script lang="ts" setup>
import { useConfig } from 'solarwind/composables/config'
import type { SolarwindConfig } from 'solarwind/types'

type Props = {
  config: Partial<SolarwindConfig>
}
const props = defineProps<Props>()

const config = useConfig(props.config)
</script>

<template>
  <slot :config="config" />
</template>
