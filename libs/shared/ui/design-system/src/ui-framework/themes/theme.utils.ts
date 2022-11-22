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

export function extract(color: Record<number, string>): ColorTuple {
  const original = Object.values(color)
  return [
    'FFFFFF',
    original[0],
    original[1],
    original[2],
    original[3],
    original[4],
    original[5],
    original[6],
    original[7],
    original[8],
  ]
}
