/**
 * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
 */
export const getError = async <TError>(
  call: () => unknown,
): Promise<TError | undefined> => {
  try {
    await call()
  } catch (error: unknown) {
    return error as TError
  }
}
