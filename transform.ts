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