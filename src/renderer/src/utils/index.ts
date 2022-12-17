export function arraysShareValues<T>(array1: T[], array2: T[]) {
  return array1.filter((element) => array2.includes(element)).length > 0
}
