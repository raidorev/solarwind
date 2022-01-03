function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        background: withOpacityValue('--s-color-background'),
        onBackground: withOpacityValue('--s-color-onBackground'),
        surface: withOpacityValue('--s-color-surface'),
        onSurface: withOpacityValue('--s-color-onSurface'),
        primary: withOpacityValue('--s-color-primary'),
        onPrimary: withOpacityValue('--s-color-onPrimary'),
        secondary: withOpacityValue('--s-color-secondary'),
        onSecondary: withOpacityValue('--s-color-onSecondary'),
        error: withOpacityValue('--s-color-error'),
        onError: withOpacityValue('--s-color-onError'),
        warning: withOpacityValue('--s-color-warning'),
        onWarning: withOpacityValue('--s-color-onWarning'),
        success: withOpacityValue('--s-color-success'),
        onSuccess: withOpacityValue('--s-color-onSuccess'),
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
