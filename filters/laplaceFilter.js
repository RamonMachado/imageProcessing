const Filter = require("./filter.js");
const Jimp = require("jimp");

let width = 3;
let height = 3;
let mask1 = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0]
];
let mask2 = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

let masks = [mask1, mask2];

let laplaceFilter = new Filter(width, height, masks);

module.exports = laplaceFilter;