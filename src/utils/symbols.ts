import type { InjectionKey } from 'vue'
import type { SolarwindOptions } from 'solarwind/types'

export const configSymbol: InjectionKey<SolarwindOptions> = Symbol(
  '[solarwind]: config',
)
