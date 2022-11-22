const tailwindBaseConfig = require('../../../.tailwind/tailwind.config.base')

module.exports = {
  presets: [tailwindBaseConfig(__dirname, 'src')],
  corePlugins: {
    preflight: false,
  },
}
