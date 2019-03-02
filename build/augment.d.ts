import * as cv from 'opencv4nodejs';
import { IAugmentationConfig } from './types';
export declare function augment(input: cv.Mat | string, config: IAugmentationConfig): cv.Mat;
