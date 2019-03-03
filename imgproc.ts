import * as cv from 'opencv4nodejs';

import { IBox } from './types';

export function randomCrop(img: cv.Mat, roi: IBox) {
  const x = Math.max(0, roi.x0) * img.cols
  const y = Math.max(0, roi.y0) * img.rows
  const maxX = Math.min(img.cols, x + Math.max(0, (roi.x1 * img.cols) - x))
  const maxY = Math.min(img.rows, y + Math.max(0, (roi.y1 * img.rows) - y))

  const x0 = Math.random() * x
  const y0 = Math.random() * y
  const x1 = (Math.random() * Math.abs(img.cols - maxX)) + maxX
  const y1 = (Math.random() * Math.abs(img.rows - maxY)) + maxY

  return img.getRegion(new cv.Rect(x0, y0, x1 - x0, y1 - y0)).copy()
}

export function rotate(img: cv.Mat, angle: number) {
  const ct = new cv.Point2(img.cols / 2, img.rows / 2)
  const rot = cv.getRotationMatrix2D(ct, angle, 1.0)

  const bbox = new cv.RotatedRect(new cv.Point2(0, 0), new cv.Size(img.cols, img.rows), angle).boundingRect()
  rot.set(0, 2, rot.at(0, 2) + (bbox.width / 2) - (img.cols / 2))
  rot.set(1, 2, rot.at(1, 2) + (bbox.height / 2) - (img.rows / 2))

  return img.warpAffine(rot, new cv.Size(bbox.width, bbox.height))
}

export function adjustIntensity(img: cv.Mat, alpha: number, beta: number) {
  const betaMask = new cv.Mat(img.rows, img.cols, img.type, Array(img.channels).fill(Math.abs(beta)))
  const result = img.mul(alpha)
  return beta < 0 ? result.sub(betaMask) : result.add(betaMask)
}

export function toGray(img: cv.Mat) {
  return img.channels === 3 ? img.cvtColor(cv.COLOR_BGR2GRAY) : img
}

export function blur(img: cv.Mat, kernelSize: number, stddev: number) {
  return img.gaussianBlur(new cv.Size(kernelSize, kernelSize), stddev, stddev)
}

export function padToSquare(img: cv.Mat, centerContent: boolean) {
  const maxDim = Math.max(img.rows, img.cols)
  const square = new cv.Mat(maxDim, maxDim, img.type, Array(img.channels).fill(Math.abs(0)))

  const dx = centerContent ? Math.abs(square.cols - img.cols) / 2 : 0
  const dy = centerContent ? Math.abs(square.rows - img.rows) / 2 : 0
  img.copyTo(square.getRegion(new cv.Rect(dx, dy, img.cols, img.rows)))

  return square
}