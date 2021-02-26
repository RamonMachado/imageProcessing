const Jimp = require("jimp");

async function getImage(imagePath) {
    let image = Jimp.read(imagePath)
        .then(image => {
            return image
        })
        .catch(err => {
            console.log(err);
        });
    return image;
}

function writeImage(image, name, format) {
    image.write(name + "." + format); // save
}

//after some thought, this function seems useless
function getRGBMatrix(image) {
    let width = image.getWidth();
    let height = image.getHeight();
    let imageArray = new Array(height);

    for (let i = 0; i < height; i++) {
        imageArray[i] = new Array(width);
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            imageArray[i][j] = Jimp.intToRGBA(image.getPixelColor(i, j));
        }
    }

    return imageArray;
}

function applyMask(){

}

module.exports = {
    getImage,
    writeImage,
    getRGBMatrix
}