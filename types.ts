export interface IBox {
  x0: number
  y0: number
  x1: number
  y1: number
}

export interface IAugmentationConfig {
  randomCrop?: IBox
  rotate?: number
  flip?: boolean
}