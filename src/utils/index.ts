export const uniqNumber = (from: number, to: number = 1) => {
  return Math.floor(Math.random() * (to - from) + from)
}
