import { forEach, toPairs, head, split, last } from 'lodash-es'
import { configSymbol } from './utils/symbols'
import type { App } from 'vue'
import type { SolarwindOptions } from './types'

export const createSolarwind = (options: SolarwindOptions) => {
  const install = (app: App) => {
    const components = import.meta.globEager('./components/*.vue')

    // Provide global config
    app.provide(configSymbol, options)

    // Register all component globally
    forEach(toPairs(components), ([filename, component]) => {
      // /src/path/to/component-name.vue -> component-name
      const name = head(split(last(split(filename, '/')), '.'))
      if (!name) {
        throw new Error(`Cannot get name of component by filename ${filename}`)
      }

      app.component(name, component.default)
    })
  }

  return { install }
}
