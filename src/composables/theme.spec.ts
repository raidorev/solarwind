import { mount } from '@vue/test-utils'
import { map } from 'lodash-es'
import { ref } from 'vue'
import { solar } from 'solarwind/presets'
import { type SolarwindTheme } from 'solarwind/types'
import { configSymbol } from 'solarwind/utils/symbols'
import { getError } from 'solarwind/utils/test'
import { useTheme } from './theme'

describe('Theme composable', () => {
  describe('useTheme', () => {
    const lunar: SolarwindTheme = { ...solar.themes['solar'], name: 'lunar' }
    const config = { ...solar, themes: { ...solar.themes, lunar } }

    const componentOptions = {
      template: '<div ref="wrapper" id="wrapper">{{ theme.name }}</div>',
      setup() {
        const wrapper = ref<HTMLDivElement>()
        const theme = useTheme(wrapper)
        return { theme, wrapper }
      },
    }

    it('should use provided config', () => {
      const component = mount(componentOptions, {
        global: {
          provide: {
            [configSymbol as symbol]: config,
          },
        },
      })

      expect(component.text()).toBe('solar')
    })

    it('should return current theme when no arguments provided', () => {
      const component = mount(
        {
          template: '{{ theme.name }}',
          setup() {
            const theme = useTheme()
            return { theme }
          },
        },
        {
          global: {
            provide: {
              [configSymbol as symbol]: config,
            },
          },
        },
      )

      expect(component.text()).toBe('solar')
    })

    it('should set css variables on wrapper', () => {
      const component = mount(componentOptions, {
        global: {
          provide: {
            [configSymbol as symbol]: config,
          },
        },
      })

      const cssVariables = map(solar.themes['solar'].colors, (value, key) => [
        `--s-color-${key}`,
        value,
      ])

      const styles = window.getComputedStyle(
        component.get<HTMLDivElement>('#wrapper').element,
      )

      for (const [key, color] of cssVariables) {
        expect(styles.getPropertyValue(key)).toBe(color)
      }
    })

    it('should change theme in config', () => {
      const component = mount(
        {
          template: '<div ref="wrapper" id="wrapper">{{ theme.name }}</div>',
          setup() {
            const wrapper = ref<HTMLDivElement>()
            const theme = useTheme(wrapper, 'lunar')
            return { theme, wrapper }
          },
        },
        {
          global: {
            provide: {
              [configSymbol as symbol]: config,
            },
          },
        },
      )

      expect(component.text()).toBe('lunar')
    })

    it('should throw error when theme does not exists', async () => {
      const error = await getError<Error>(() => {
        mount(
          {
            template: '<div ref="wrapper" id="wrapper">{{ theme.name }}</div>',
            setup() {
              const wrapper = ref<HTMLDivElement>()
              const theme = useTheme(wrapper, 'wind')
              return { theme, wrapper }
            },
          },
          {
            global: {
              provide: {
                [configSymbol as symbol]: config,
              },
            },
          },
        )
      })

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toContain('Cannot get theme')
    })

    it('should throw error when wrapper cannot be founded', async () => {
      const error = await getError<Error>(() => {
        mount(
          {
            template: '<div id="wrapper">{{ theme.name }}</div>',
            setup() {
              const wrapper = ref<HTMLDivElement>()
              const theme = useTheme(wrapper, 'solar')
              return { theme, wrapper }
            },
          },
          {
            global: {
              provide: {
                [configSymbol as symbol]: config,
              },
            },
          },
        )
      })

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toContain('Cannot get wrapper')
    })
  })
})
