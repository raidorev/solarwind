import { inject, provide, ref } from 'vue'
import { themeSymbol } from 'solarwind/utils/symbols'
import { useConfig } from './config'
import type { Ref } from 'vue'
import type { SolarwindTheme } from 'solarwind/types'

export const useTheme = (themeName?: string) => {
  const config = useConfig()

  if (themeName) {
    const theme = config.themes[themeName]
    if (!theme) {
      throw new Error(`Cannot get theme with name ${themeName}`)
    }

    const t: Ref<SolarwindTheme> = ref(theme)
    provide(themeSymbol, ref(t))

    return t
  }

  const currentTheme = inject(themeSymbol)
  if (!currentTheme) {
    throw new Error('Please, provide theme first')
  }

  return currentTheme
}
