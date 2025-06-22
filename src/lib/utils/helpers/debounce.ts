export const debounce = (func: { (value: string): void }, timeout = 1000) => {
  let timer: NodeJS.Timeout | undefined
  return (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(value)
    }, timeout)
  }
}
