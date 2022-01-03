export class SolarwindError extends Error {
  public static createThrower(scope: string) {
    return (message: string) => {
      throw new SolarwindError(scope, message)
    }
  }

  public readonly name = this.constructor.name

  constructor(scope: string, message: string) {
    super(`[${scope}] ${message}`)
  }
}
