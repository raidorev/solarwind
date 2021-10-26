<script lang="ts" setup>
import { provide, inject } from 'vue'
import * as s from 'superstruct'
import { defaultsDeep } from 'lodash-es'
import { configSymbol } from 'solarwind/utils/symbols'
import type { PartialDeep } from 'type-fest'
import type { SolarwindConfig } from 'solarwind/types'

type Props = {
  config: PartialDeep<SolarwindConfig>
}
const props = defineProps<Props>()

// If there is no arguments, vue logs warning when injection not found
// eslint-disable-next-line unicorn/no-useless-undefined
const oldConfig = inject(configSymbol, undefined)

// inject can't be used outside setup function (e.g. prop validator),
// this is why validation happens here, not in prop validator
const configSchema:
  | s.Describe<SolarwindConfig>
  | s.Describe<PartialDeep<SolarwindConfig>> = s.object({})

const [error, config] = configSchema.validate(props.config)

if (error) {
  console.warn(
    'Incorrect configuration is provided in "s-config-provider" component',
  )
  throw error
}

provide(configSymbol, defaultsDeep(config, oldConfig))
</script>

<template>
  <slot />
</template>
