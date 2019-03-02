import * as cv from 'opencv4nodejs';

import { augment } from './augment';

const roi = { x0: 0.3, y0: 0, x1: 0.7 , y1: 1.0}

const config = {
  randomCrop: roi,
  flip: true,
  rotate: 45,
  blur: { kernelSize: 5, stddev: 1.0 },
  intensity: { alpha: 1.2, beta: 5 },
  toGray: false
}

console.log(config)
const result = augment('./lenna.jpg', config)
cv.imshowWait('result', result)