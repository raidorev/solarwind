import { merge } from 'lodash-es'
import * as s from 'superstruct'
import { inject, provide } from 'vue'
import { configSymbol } from 'solarwind/utils/symbols'
import type { SolarwindConfig } from 'solarwind/types'

const baseConfigScheme: s.Describe<SolarwindConfig> = s.object({
  orientation: s.enums(['rtl', 'ltr']),
})

export const useConfig = (newConfig?: Partial<SolarwindConfig>) => {
  if (newConfig) {
    const oldConfig = inject<SolarwindConfig>(configSymbol)
    if (oldConfig) {
      s.assert(newConfig, s.partial(baseConfigScheme))

      const config = merge(oldConfig, newConfig)
      provide<SolarwindConfig>(configSymbol, config)
      return config
    }

    s.assert(newConfig, baseConfigScheme)
    provide<SolarwindConfig>(configSymbol, newConfig)
    return newConfig
  }

  const config = inject<SolarwindConfig>(configSymbol)
  if (!config) {
    throw new Error("Cannot get config, make sure it's provided")
  }

  return config
}
