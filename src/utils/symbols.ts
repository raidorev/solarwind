import type { InjectionKey } from 'vue'
import type { PartialDeep } from 'type-fest'
import type { SolarwindConfig } from 'solarwind/types'

export const configSymbol: InjectionKey<PartialDeep<SolarwindConfig>> = Symbol(
  '[solarwind]: config',
)
