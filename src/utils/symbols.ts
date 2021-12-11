import type { SolarwindConfig } from 'solarwind/types'
import type { PartialDeep } from 'type-fest'
import type { InjectionKey } from 'vue'

export const configSymbol: InjectionKey<PartialDeep<SolarwindConfig>> = Symbol(
  '[solarwind]: config',
)
