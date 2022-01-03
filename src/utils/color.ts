import { SolarwindError } from './error'

const error = SolarwindError.createThrower('utils:color')

/**
 * Transform hex color to rgba channels
 *
 * @param hex color in hex format (`#rrggbb` or `#rrggbbaa`)
 * @returns red, green, blue and alpha channels
 */
export const rgbaChannelsFromHex = (
  hex: string,
): [number, number, number, number] => {
  if (!/^#[\da-f]{6}(?:[\da-f]{2})?$/i.test(hex)) {
    error('Invalid hex format')
  }

  if (hex.length === 7) {
    hex += 'ff'
  }

  const parsedHex = Number.parseInt(hex.slice(1), 16)
  const r = (parsedHex >> 24) & 255
  const g = (parsedHex >> 16) & 255
  const b = (parsedHex >> 8) & 255
  const a = parsedHex & 255

  return [r, g, b, a]
}
