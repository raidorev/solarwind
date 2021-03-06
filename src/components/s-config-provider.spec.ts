import { config, mount } from '@vue/test-utils'
import { noop } from 'lodash-es'
import SConfigProvider from 'solarwind/components/s-config-provider.vue'
import { solar } from 'solarwind/presets'

config.global.config.warnHandler = noop

describe('s-config-provider', () => {
  it('should provide config', () => {
    const component = mount(SConfigProvider, {
      props: {
        config: solar,
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
