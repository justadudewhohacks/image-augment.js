export const random = {
  bool: (p: number) => Math.random() < p,
  number: (min: number, max: number) => Math.random() * (max - min) + min,
  option: <T>(options: T[]) => options[Math.floor(Math.random() * options.length)]
}