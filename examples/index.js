const cv = require('opencv4nodejs')
const { augment, random } = require('../')

const roi = { x0: 0.3, y0: 0, x1: 0.7 , y1: 1.0}

// continue with ENTER, exit with any other key
let key = 13
while (key === 13) {
  const config = {
    randomCrop: roi,
    flip: random.bool(0.5),
    rotate: random.number(-20, 20),
    blur: { kernelSize:  random.option([3, 5, 7, 11]), stddev: random.number(0.5, 1.5) },
    intensity: { alpha: random.number(0.8, 1.2), beta: random.number(-10, 10) },
    toGray:  random.bool(0.1)
  }
  console.log(config)

  cv.imshow('result', augment('./lenna.jpg', config))
  key = cv.waitKey()
}