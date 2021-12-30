export interface SolarwindConfig {
  orientation: 'ltr' | 'rtl'

  theme: string
  themes: Record<string, SolarwindTheme>
}

export interface SolarwindTheme {
  name: string
  colors: Record<SolarwindColor, string>
}

export enum SolarwindColor {
  background = 'background',
  onBackground = 'onBackground',
  surface = 'surface',
  onSurface = 'onSurface',
  primary = 'primary',
  onPrimary = 'onPrimary',
  secondary = 'secondary',
  onSecondary = 'onSecondary',
  error = 'error',
  onError = 'onError',
  warning = 'warning',
  onWarning = 'onWarning',
  success = 'success',
  onSuccess = 'onSuccess',
}
