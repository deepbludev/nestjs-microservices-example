const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind')

const tailwindBaseConfig = (dirname, path) => ({
  mode: 'jit',
  content: [
    join(dirname, (path ? path + '/' : '') + '**/*.{js,jsx,ts,tsx}'),
    ...createGlobPatternsForDependencies(dirname),
  ],
  plugins: [require('@tailwindcss/typography')],
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        dark: {
          0: '#FFFFFF',
          50: '#C1C2C5',
          100: '#A6A7AB',
          200: '#909296',
          300: '#5C5F66',
          400: '#373A40',
          500: '#2C2E33',
          600: '#25262B',
          700: '#1A1B1E',
          800: '#141517',
          900: '#101113',
        },
        primary: {
          0: '#FFFFFF',
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
          700: '#F03E3E',
          800: '#E03131',
          900: '#C92A2A',
        },
      },
    },
  },
})

module.exports = tailwindBaseConfig
