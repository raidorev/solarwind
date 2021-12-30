import { mount } from '@vue/test-utils'
import SThemeProvider from 'solarwind/components/s-theme-provider.vue'
import { solar } from 'solarwind/presets'
import { configSymbol } from 'solarwind/utils/symbols'

describe('s-theme-provider', () => {
  it('should have scoped slot theme value', () => {
    const component = mount(SThemeProvider, {
      slots: {
        default: `
          <template #default="{ theme }">
            {{ theme.name }}
          </template>
        `,
      },
      global: {
        provide: {
          [configSymbol as symbol]: solar,
        },
      },
    })

    expect(component.text()).toBe('solar')
  })
})
