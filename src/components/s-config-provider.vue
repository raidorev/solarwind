<script lang="ts" setup>
import { provide, inject } from 'vue'
import { defaultsDeep } from 'lodash-es'
import { configSymbol } from 'solarwind/utils/symbols'
import type { PartialDeep } from 'type-fest'
import type { SolarwindOptions } from 'solarwind/types'

type Props = {
  config: PartialDeep<SolarwindOptions>
}
const props = defineProps<Props>()

const oldConfig = inject(configSymbol, {})

provide(configSymbol, defaultsDeep(props.config, oldConfig))
</script>

<template>
  <slot />
</template>
