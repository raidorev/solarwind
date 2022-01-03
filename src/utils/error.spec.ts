import { SolarwindError } from './error'
import { getError } from './test'

describe('Error utils', () => {
  it('should throw SolarwindError', async () => {
    const error = await getError<SolarwindError>(() => {
      throw new SolarwindError('utils:error', 'test error')
    })

    expect(error).toBeInstanceOf(SolarwindError)
  })

  it('should format message', async () => {
    const error = await getError<SolarwindError>(() => {
      throw new SolarwindError('utils:error', 'test error')
    })

    expect(error?.message).toBe('[utils:error] test error')
  })

  it('should create thrower', async () => {
    const utilsError = SolarwindError.createThrower('utils:error')

    const error = await getError<SolarwindError>(() => {
      utilsError('test error')
    })

    expect(error).toBeInstanceOf(SolarwindError)
    expect(error?.message).toBe('[utils:error] test error')
  })
})
