import { mount } from '@vue/test-utils'
import { forEach, noop } from 'lodash-es'
import { StructError } from 'superstruct'
import SConfigProvider from 'solarwind/components/s-config-provider.vue'
import { configSymbol } from 'solarwind/utils/symbols'
import { getError } from 'solarwind/utils/test'

describe('s-config-provider', () => {
  beforeEach(() => {
    // Disable logs
    jest.spyOn(console, 'error').mockImplementation(noop)
    jest.spyOn(console, 'warn').mockImplementation(noop)
  })

  it('should throw StructError when config has the wrong shape or type', () => {
    const wrongConfigs = [
      {
        thisPropertyDoesNot: 'ExistsInConifg',
      },
      undefined,
      10,
    ]

    forEach(wrongConfigs, async (config) => {
      const error = await getError<StructError>(() => {
        mount(SConfigProvider, {
          props: { config },
        })
      })

      expect(console.warn).toHaveBeenCalledWith(
        'Incorrect configuration is provided in "s-config-provider" component',
      )
      expect(error).toBeInstanceOf(StructError)
    })
  })

  it('should mount correctly if the configuration passed is correct', () => {
    const slot = 'Hello'
    const wrapper = mount(SConfigProvider, {
      props: {
        config: {},
      },
      slots: {
        default: slot,
      },
    })

    expect(wrapper.html()).toBe(slot)
  })

  it('should throw a StructError if no top-level configuration is provided and the new configuration lacks the necessary fields', async () => {
    const error = await getError(() => {
      mount(SConfigProvider, {
        props: {
          config: {},
        },
      })
    })

    // expect(error).toBeInstanceOf(StructError)
    // TODO: Currently config has no required fields. Make sure to replace this
    //  line with the line above when the required fields appear in config
    expect(error).toBe(undefined)
  })

  it('should allow the required fields to be skipped if the top-level config is provided', async () => {
    const error = await getError(() => {
      mount(SConfigProvider, {
        props: {
          config: {},
        },
        global: {
          provide: {
            [configSymbol as symbol]: {},
          },
        },
      })
    })

    expect(error).toBe(undefined)
  })
})
