<script lang="ts" setup>
import type { SolarwindConfig } from 'solarwind/types'

type Props = {
  config: SolarwindConfig
}
const props = defineProps<Props>()
</script>

<template>
  <s-config-provider :config="props.config">
    <s-theme-provider>
      <slot />
    </s-theme-provider>
  </s-config-provider>
</template>
