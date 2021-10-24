export interface SolarwindOptions {
  defaultTheme: string
  themes: {
    [key: string]: SolarwindTheme
  }
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

export interface SolarwindTheme {
  name: string
  colors: Record<SolarwindColor, string>
}
