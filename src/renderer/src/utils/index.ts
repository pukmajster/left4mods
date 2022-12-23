export function arraysShareValues<T>(array1: T[], array2: T[]) {
  return array1.filter((element) => array2.includes(element)).length > 0
}

export function trimString(string, length) {
  return string.length > length ? string.substring(0, length) + '...' : string
}
