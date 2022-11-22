export type ColorTuple = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
]

const extract = (color: Record<number, string>): ColorTuple =>
  Object.values(color).slice(1) as ColorTuple

export type ObeyaColor = 'primary' | 'green' | 'brown' | 'gray'

export const colors: Record<ObeyaColor, ColorTuple> = {
  primary: extract({
    0: '#FFFFFF',
    50: '#126245',
    100: '#126245',
    200: '#126245',
    300: '#126245',
    400: '#126245',
    500: '#126245',
    600: '#126245',
    700: '#126245',
    800: '#126245',
    900: '#126245',
  }),
  green: extract({
    0: '#FFFFFF',
    50: '#32C67F',
    100: '#32C67F',
    200: '#32C67F',
    300: '#32C67F',
    400: '#32C67F',
    500: '#32C67F',
    600: '#32C67F',
    700: '#32C67F',
    800: '#32C67F',
    900: '#32C67F',
  }),
  brown: extract({
    0: '#FFFFFF',
    50: '#32C67F',
    100: '#32C67F',
    200: '#32C67F',
    300: '#32C67F',
    400: '#32C67F',
    500: '#32C67F',
    600: '#32C67F',
    700: '#32C67F',
    800: '#32C67F',
    900: '#32C67F',
  }),
  gray: extract({
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
    900: '#000000',
  }),
}
