import * as cv from 'opencv4nodejs';

import { randomCrop, rotate } from './transform';
import { IAugmentationConfig, IBox } from './types';


export function augment(input: cv.Mat | string, config: IAugmentationConfig): cv.Mat {
  let img: cv.Mat = typeof input === 'string'
    ? cv.imread(input)
    : input

  if (!(img instanceof cv.Mat)) {
    throw new Error('augment - expected input to be cv.Mat or valid path to an image file')
  }

  let roi: IBox = config.randomCrop || { x0: 0, y0: 0, x1: 1.0, y1: 1.0 }
  let result: cv.Mat = img

  result = config.randomCrop ? randomCrop(result, roi) : result
  result = config.flip ? result.flip(1) : result

  const angle = config.rotate
  result = typeof angle === 'number' ? rotate(result, angle) : result

  return result
}