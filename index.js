const { getImage, writeImage } = require("./image.js");

let laplaceFilter = require('./filters/laplaceFilter.js');

require('dotenv/config');
let image_name = process.env.IMAGE_NAME;
let image_format = process.env.IMAGE_FORMAT;
const imagePath = "images/" + image_name + "." + image_format;

main();

async function main() {

    await runAvgFilter();
    await runGaussFilter();
    await runLaplaceFilter();
    await runLoGFilter();
}

async function runAvgFilter() {

    let image = await getImage(imagePath);

    const avgFilter = require('./filters/avgFilter.js');

    let myImage = avgFilter.apply(image);

    writeImage(myImage, "results/avg/" + `${Date.now()}_${image_name}`, "jpg");

}

async function runGaussFilter() {

    let image = await getImage(imagePath);

    const gaussFilter = require('./filters/gaussFilter.js');
    
    let myImage = gaussFilter.apply(image);

    writeImage(myImage, "results/gauss/" + `${Date.now()}_${image_name}`, "jpg");

}

async function runLaplaceFilter() {

    let image = await getImage(imagePath);

    const laplaceFilter = require('./filters/laplaceFilter.js');
    
    let myImage = laplaceFilter.apply(image);

    writeImage(myImage, "results/laplace/" + `${Date.now()}_${image_name}`, "jpg");

}

async function runLoGFilter() {

    let image = await getImage(imagePath);

    const gaussFilter = require('./filters/gaussFilter.js');
    const laplaceFilter = require('./filters/laplaceFilter.js');
    
    let myImage = gaussFilter.apply(image);
    myImage = laplaceFilter.apply(myImage);

    writeImage(myImage, "results/log/" + `${Date.now()}_${image_name}`, "jpg");

}