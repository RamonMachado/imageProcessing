const Filter = require("./filter.js");
const Jimp = require("jimp");

let width = 3;
let height = 3;
let mask = [1, 2, 1,
            2, 4, 2,
            1, 2, 1];

let gaussFilter = new Filter(width, height, mask);

module.exports = gaussFilter;