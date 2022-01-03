import { forEach, has } from 'lodash-es'
import { onMounted, type Ref } from 'vue'
import { type SolarwindTheme } from 'solarwind/types'
import { useConfig } from './config'

export const useTheme = (
  wrapper?: Ref<HTMLElement | undefined>,
  name?: string,
): SolarwindTheme => {
  const config = useConfig()

  if (!wrapper) {
    return config.themes[config.theme]
  }

  const themeName = name || config.theme
  if (name) {
    useConfig({ ...config, theme: name })
  }

  if (!has(config.themes, themeName)) {
    throw new Error('Cannot get theme')
  }

  const theme = config.themes[themeName]

  onMounted(() => {
    if (!wrapper.value) {
      throw new Error('Cannot get wrapper element')
    }

    forEach(theme.colors, (color, colorName) => {
      wrapper.value?.style.setProperty(`--s-color-${colorName}`, color)
    })
  })

  return theme
}
