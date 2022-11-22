export type ObeyaColor = 'primary' | 'action' | 'background' | 'bnw'

export const ObeyaColors = {
  'dark-green': {
    20: '#E3EBE5',
    30: '#C8D7CC',
    40: '#ADC4B4',
    50: '#92B09C',
    60: '#789D85',
    70: '#5E8A6E',
    80: '#447858',
    90: '#286643',
    100: '#00542F',
  },
  primary: {
    20: '#E3EBE5',
    40: '#ADC4B4',
    60: '#789D85',
    80: '#447858',
    100: '#00542F',
  },

  'light-green': {
    20: '#ECF9F0',
    30: '#D8F4E2',
    40: '#C5EED3',
    50: '#B1E8C5',
    60: '#9CE1B7',
    70: '#86DBA9',
    80: '#6FD49B',
    90: '#55CE8D',
    100: '#32C77F',
  },
  action: {
    80: '#6FD49B',
    100: '#32C77F',
  },

  'light-gray': {
    20: '#FEFEFE',
    30: '#FCFCFC',
    40: '#FBFBFB',
    50: '#F9F9F9',
    60: '#F8F8F8',
    70: '#F6F6F6',
    80: '#F5F5F5',
    90: '#F3F3F3',
    100: '#F2F2F2',
  },
  background: {
    80: '#F5F5F5',
    100: '#F2F2F2',
  },

  grayscale: {
    20: '#DFDFDF',
    30: '#C0C0C0',
    40: '#A2A2A2',
    50: '#858585',
    60: '#696969',
    70: '#4E4E4E',
    80: '#353535',
    90: '#262626',
    100: '#000000',
  },
  bnw: {
    20: '#DFDFDF',
    30: '#C0C0C0',
    50: '#858585',
    60: '#696969',
    90: '#262626',
    100: '#000000',
  },
} as const
