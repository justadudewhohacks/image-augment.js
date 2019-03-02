"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = {
    bool: function (p) { return Math.random() < p; },
    number: function (min, max) { return Math.random() * (max - min) + min; },
    option: function (options) { return options[Math.floor(Math.random() * options.length)]; }
};
