import { mount } from '@vue/test-utils'
import { map } from 'lodash-es'
import { ref } from 'vue'
import { solar } from 'solarwind/presets'
import { configSymbol } from 'solarwind/utils/symbols'
import { useTheme } from './theme'

describe('Theme composable', () => {
  describe('useTheme', () => {
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
            [configSymbol as symbol]: solar,
          },
        },
      })

      expect(component.text()).toBe('solar')
    })

    it('should set css variables on wrapper', () => {
      const component = mount(componentOptions, {
        global: {
          provide: {
            [configSymbol as symbol]: solar,
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
  })
})
