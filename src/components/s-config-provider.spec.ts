import { config, mount } from '@vue/test-utils'
import { noop } from 'lodash'
import SConfigProvider from 'solarwind/components/s-config-provider.vue'
import type { SolarwindConfig } from 'solarwind/types'

config.global.config.warnHandler = noop

describe('s-config-provider', () => {
  it('should provide config', () => {
    const component = mount(SConfigProvider, {
      props: {
        config: {
          orientation: 'ltr',
        } as SolarwindConfig,
      },
      slots: {
        default: `
          <template #default="{ config }">
            {{ config.orientation }}
          </template>
        `,
      },
    })

    expect(component.text()).toBe('ltr')
  })
})
