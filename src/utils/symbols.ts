import type { InjectionKey } from 'vue'
import type { PartialDeep } from 'type-fest'
import type { SolarwindOptions } from 'solarwind/types'

export const configSymbol: InjectionKey<PartialDeep<SolarwindOptions>> = Symbol(
  '[solarwind]: config',
)
