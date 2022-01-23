import { map, repeat } from 'lodash-es'
import { SolarwindError } from './error'

const error = SolarwindError.createThrower('utils:color')

/**
 * Transform hex color to rgba channels
 *
 * @param hex color in hex format (`#rgb`, `#rgba`, `#rrggbb` or `#rrggbbaa`)
 * @returns red, green, blue and alpha channels
 */
export const rgbaChannelsFromHex = (
  hex: string,
): [number, number, number, number] => {
  if (
    !/^#[\da-f]{3,4}$/i.test(hex) &&
    !/^#[\da-f]{6}(?:[\da-f]{2})?$/i.test(hex)
  ) {
    error(`Invalid hex format: ${hex}`)
  }

  // Add max alpha channel if format is `#rgb`
  if (hex.length === 4) {
    hex += 'f'
  }

  // Transform `#rgba` to `#rrggbbaa`
  if (hex.length === 5) {
    const rgba = hex.slice(1)
    const rrggbbaa = map(rgba, (c) => repeat(c, 2)).join('')
    hex = `#${rrggbbaa}`
  }

  // Add max alpha channel if format is `#rrggbb`
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
