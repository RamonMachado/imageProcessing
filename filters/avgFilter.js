const Filter = require("./filter.js");
const Jimp = require("jimp");

let width = 3;
let height = 3;

let mask1 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

let masks = [mask1];

let resultFunction = (neighborValue, maskValue) => {
    return (neighborValue * maskValue) / 9;
}

let avgFilter = new Filter(width, height, masks, {resultFunction});

module.exports = avgFilter;