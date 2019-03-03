"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cv = require("opencv4nodejs");
var imgproc_1 = require("./imgproc");
function augment(input, config) {
    var img = typeof input === 'string'
        ? cv.imread(input)
        : input.copy();
    if (!(img instanceof cv.Mat)) {
        throw new Error('augment - expected input to be cv.Mat or valid path to an image file');
    }
    img = config.intensity ? imgproc_1.adjustIntensity(img, config.intensity.alpha, config.intensity.beta) : img;
    img = config.toGray ? imgproc_1.toGray(img) : img;
    img = config.blur ? imgproc_1.blur(img, config.blur.kernelSize, config.blur.stddev) : img;
    // TODO noise
    var roi = config.randomCrop || { x0: 0, y0: 0, x1: 1.0, y1: 1.0 };
    var angle = config.rotate;
    img = config.randomCrop ? imgproc_1.randomCrop(img, roi) : img;
    // TODO shearing
    img = config.flip ? img.flip(1) : img;
    img = typeof angle === 'number' ? imgproc_1.rotate(img, angle) : img;
    var maxDim = config.resize;
    img = typeof maxDim === 'number' ? img.resizeToMax(maxDim) : img;
    img = config.toSquare ? imgproc_1.padToSquare(img, config.toSquare.centerContent) : img;
    return img;
}
exports.augment = augment;
