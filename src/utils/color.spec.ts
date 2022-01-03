import { rgbaChannelsFromHex } from './color'
import { SolarwindError } from './error'
import { getError } from './test'

describe('Color utils', () => {
  describe('rgbaChannelsFromHex', () => {
    it('should convert hex to rgba channels', () => {
      const colors = {
        '#ffffff': [255, 255, 255, 255],
        '#000000': [0, 0, 0, 255],
        '#fcbbee10': [252, 187, 238, 16],
      }

      for (const [hex, rgba] of Object.entries(colors)) {
        expect(rgbaChannelsFromHex(hex)).toStrictEqual(rgba)
      }
    })

    it('should throw error when hex format is invalid', async () => {
      const error = await getError<Error>(() => {
        rgbaChannelsFromHex('121212')
      })

      expect(error).toBeInstanceOf(SolarwindError)
      expect(error?.message).toBe('[utils:color] Invalid hex format')
    })

    it('should throw error when string is not hex number', async () => {
      const error = await getError<Error>(() => {
        rgbaChannelsFromHex('#ffggff')
      })

      expect(error).toBeInstanceOf(SolarwindError)
      expect(error?.message).toBe('[utils:color] Invalid hex format')
    })
  })
})
