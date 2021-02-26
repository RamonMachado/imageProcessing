const Filter = require("./filter.js");
const Jimp = require("jimp");

let width = 3;
let height = 3;
let mask = [1, 1, 1,
            1, 1, 1,
            1, 1, 1];



let avgFilter = new Filter(width, height, mask);

module.exports = avgFilter;