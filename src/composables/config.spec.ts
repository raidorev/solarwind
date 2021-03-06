import { config, mount } from '@vue/test-utils'
import { noop } from 'lodash-es'
import { StructError } from 'superstruct'
import { solar } from 'solarwind/presets'
import { type SolarwindConfig } from 'solarwind/types'
import { configSymbol } from 'solarwind/utils/symbols'
import { getError } from 'solarwind/utils/test'
import { useConfig } from './config'

config.global.config.warnHandler = noop

describe('Config composable', () => {
  describe('Use config', () => {
    it('should provide a new configuration', () => {
      const component = mount({
        template: '{{ config.orientation }}',
        setup() {
          const newConfig = useConfig(solar)
          return { config: newConfig }
        },
      })

      expect(component.text()).toBe(solar.orientation)
    })

    it('should provide the previous configuration', () => {
      const component = mount(
        {
          template: '{{ config.orientation }}',
          setup() {
            const config = useConfig()
            return { config }
          },
        },
        {
          global: {
            provide: {
              [configSymbol as symbol]: solar,
            },
          },
        },
      )

      expect(component.text()).toBe(solar.orientation)
    })

    it('should forbid passing a partial configuration to the top level configuration', async () => {
      const config: Partial<SolarwindConfig> = {}

      const error = await getError<Error>(() => {
        mount({
          template: '{{ config.orientation }}',
          setup() {
            const newConfig = useConfig(config)
            return { config: newConfig }
          },
        })
      })

      expect(error).toBeInstanceOf(StructError)
    })

    it('should allow passing a partial configuration when the configuration already exists', async () => {
      const config: Partial<SolarwindConfig> = {}

      const error = await getError<Error>(() => {
        mount(
          {
            template: '{{ config.orientation }}',
            setup() {
              const newConfig = useConfig(config)
              return { config: newConfig }
            },
          },
          {
            global: {
              provide: {
                [configSymbol as symbol]: {
                  orientation: 'ltr',
                } as SolarwindConfig,
              },
            },
          },
        )
      })

      expect(error).toBe(undefined)
    })

    it('should validate config shape', async () => {
      const config = { Rick: 'Astley' }

      const error = await getError<Error>(() => {
        mount(
          {
            template: '{{ config.orientation }}',
            setup() {
              const newConfig = useConfig(config as never)
              return { config: newConfig }
            },
          },
          {
            global: {
              provide: {
                [configSymbol as symbol]: {
                  orientation: 'ltr',
                } as SolarwindConfig,
              },
            },
          },
        )
      })

      expect(error).toBeInstanceOf(StructError)
    })

    it('should throw error when config cannot be founded', async () => {
      const error = await getError<Error>(() => {
        mount({
          template: '{{ config.orientation }}',
          setup() {
            const config = useConfig()
            return { config }
          },
        })
      })

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toContain('Cannot get config')
    })
  })
})
