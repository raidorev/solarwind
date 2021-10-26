import { inject } from 'vue'
import { configSymbol } from 'solarwind/utils/symbols'
import type { SolarwindConfig } from 'solarwind/types'

export const useConfig = () => {
  const config = inject<SolarwindConfig>(configSymbol)
  if (!config) {
    throw new Error("Cannot get config, make sure it's provided")
  }

  return config
}
