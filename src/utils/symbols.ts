import type { InjectionKey, Ref } from 'vue'
import type { SolarwindOptions, SolarwindTheme } from 'solarwind/types'

export const configSymbol: InjectionKey<SolarwindOptions> = Symbol(
  '[solarwind]: config',
)

export const themeSymbol: InjectionKey<Ref<SolarwindTheme>> =
  Symbol('[solarwind]: theme')
