import * as cv from 'opencv4nodejs';

import { adjustIntensity, blur, padToSquare, randomCrop, rotate, toGray } from './imgproc';
import { IAugmentationConfig, IBox } from './types';

export function augment(input: cv.Mat | string, config: IAugmentationConfig): cv.Mat {
  let img: cv.Mat = typeof input === 'string'
    ? cv.imread(input)
    : input.copy()

  if (!(img instanceof cv.Mat)) {
    throw new Error('augment - expected input to be cv.Mat or valid path to an image file')
  }

  img = config.intensity ? adjustIntensity(img, config.intensity.alpha, config.intensity.beta) : img
  img = config.toGray ? toGray(img) : img

  img = config.blur ? blur(img, config.blur.kernelSize, config.blur.stddev) : img

  // TODO noise

  const roi: IBox = config.randomCrop || { x0: 0, y0: 0, x1: 1.0, y1: 1.0 }
  const angle = config.rotate

  img = config.randomCrop ? randomCrop(img, roi) : img
  // TODO shearing
  img = config.flip ? img.flip(1) : img
  img = typeof angle === 'number' ? rotate(img, angle) : img

  const maxDim = config.resize
  img = typeof maxDim === 'number' ? img.resizeToMax(maxDim) : img
  img = config.toSquare ? padToSquare(img, config.toSquare.centerContent) : img

  return img
}