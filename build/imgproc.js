"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cv = require("opencv4nodejs");
function randomCrop(img, roi) {
    var x = Math.max(0, roi.x0) * img.cols;
    var y = Math.max(0, roi.y0) * img.rows;
    var maxX = Math.min(img.cols, x + Math.max(0, (roi.x1 * img.cols) - x));
    var maxY = Math.min(img.rows, y + Math.max(0, (roi.y1 * img.rows) - y));
    var x0 = Math.random() * x;
    var y0 = Math.random() * y;
    var x1 = (Math.random() * Math.abs(img.cols - maxX)) + maxX;
    var y1 = (Math.random() * Math.abs(img.rows - maxY)) + maxY;
    return img.getRegion(new cv.Rect(x0, y0, x1 - x0, y1 - y0)).copy();
}
exports.randomCrop = randomCrop;
function rotate(img, angle) {
    var ct = new cv.Point2(img.cols / 2, img.rows / 2);
    var rot = cv.getRotationMatrix2D(ct, angle, 1.0);
    var bbox = new cv.RotatedRect(new cv.Point2(0, 0), new cv.Size(img.cols, img.rows), angle).boundingRect();
    rot.set(0, 2, rot.at(0, 2) + (bbox.width / 2) - (img.cols / 2));
    rot.set(1, 2, rot.at(1, 2) + (bbox.height / 2) - (img.rows / 2));
    return img.warpAffine(rot, new cv.Size(bbox.width, bbox.height));
}
exports.rotate = rotate;
function adjustIntensity(img, alpha, beta) {
    var betaMask = new cv.Mat(img.rows, img.cols, img.type, Array(img.channels).fill(Math.abs(beta)));
    var result = img.mul(alpha);
    return beta < 0 ? result.sub(betaMask) : result.add(betaMask);
}
exports.adjustIntensity = adjustIntensity;
function toGray(img) {
    return img.channels === 3 ? img.cvtColor(cv.COLOR_BGR2GRAY) : img;
}
exports.toGray = toGray;
function blur(img, kernelSize, stddev) {
    return img.gaussianBlur(new cv.Size(kernelSize, kernelSize), stddev, stddev);
}
exports.blur = blur;
