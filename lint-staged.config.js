const withFiles = (commands) => (filenames) =>
  // eslint-disable-next-line lodash/prefer-lodash-method
  commands.map((command) => `${command} ${filenames.join(' ')}`)

module.exports = {
  '*.{js,jsx,ts,tsx,vue,md,css,sass,scss,html}': withFiles([
    `prettier --write`,
  ]),
  '*.{js,jsx,ts,tsx,vue}': withFiles([
    'eslint --cache',
    'jest --bail --findRelatedTests',
  ]),
  'yarn.lock': () => [
    'yarn dedupe',
    'yarn dedupe --check',
    'yarn dlx @yarnpkg/doctor',
  ],
}
