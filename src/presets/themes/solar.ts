import { type SolarwindTheme } from 'solarwind/types'
import { rgbaChannelsFromHex } from 'solarwind/utils/color'

const rgb = (hex: string) => {
  const [r, g, b] = rgbaChannelsFromHex(hex)
  return `${r} ${g} ${b}`
}

export const solar: SolarwindTheme = {
  name: 'solar',
  colors: {
    background: rgb('#121212'),
    onBackground: rgb('#ffffff'),
    surface: rgb('#121212'),
    onSurface: rgb('#121212'),
    primary: rgb('#d95962'),
    onPrimary: rgb('#000000'),
    secondary: rgb('#713ba3'),
    onSecondary: rgb('#000000'),
    error: rgb('#b00020'),
    onError: rgb('#ffffff'),
    warning: rgb('#bbbb00'),
    onWarning: rgb('#ffffff'),
    success: rgb('#23bbbb'),
    onSuccess: rgb('#ffffff'),
  },
}
