const {getImage, writeImage} = require("./image.js");
let avgFilter = require('./filters/avgFilter.js');
let gaussFilter = require('./filters/gaussFilter.js');

require('dotenv/config')

async function main() {
    let image_name = process.env.IMAGE_NAME;
    const imagePath = "images/" + image_name;

    let myImage = await getImage(imagePath);

    myImage = gaussFilter.apply(myImage);

    writeImage(myImage, "results/" + `${Date.now()}_${image_name}`, "jpg");
}

main();