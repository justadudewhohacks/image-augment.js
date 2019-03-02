import * as cv from 'opencv4nodejs';
import { IBox } from './types';
export declare function randomCrop(img: cv.Mat, roi: IBox): cv.Mat;
export declare function rotate(img: cv.Mat, angle: number): cv.Mat;
export declare function adjustIntensity(img: cv.Mat, alpha: number, beta: number): cv.Mat;
export declare function toGray(img: cv.Mat): cv.Mat;
export declare function blur(img: cv.Mat, kernelSize: number, stddev: number): cv.Mat;
