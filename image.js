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

function filtroDeMedia(image){
    let width = image.getWidth();
    let height = image.getHeight();
    let newImage = Object.create(image);
    
    let filter = {};
    filter.n = 3;
    filter.m = 3;
    filter.array = [1, 1, 1,
                    1, 1, 1,
                    1, 1, 1];


    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let pixel = {};
            pixel.r = applyFilterToPixel(image, i, j, "r", filter);
            pixel.g = applyFilterToPixel(image, i, j, "g", filter);
            pixel.b = applyFilterToPixel(image, i, j, "b", filter);
            //pixel.a = applyFilterToPixel(image, i, j, "a", filter);
            pixel.a = Jimp.intToRGBA(image.getPixelColor(i, j))["a"];

            //imageArray[i][j] = Jimp.intToRGBA(image.getPixelColor(i, j));
            newImage.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), i, j);
            //newImage.setPixelColor(Jimp.rgbaToInt(255, pixel.g, pixel.b, pixel.a), i, j);
        }
    }
    return newImage;
}

function applyFilterToPixel(image, x, y, color, filter){
    let filtered = filter.array; //filter.array.map(x => 1/filter.array.length);
    let result = 0;
    for (let i = 0; i < filter.m; i++) {

        let xxDict = {0: -1, 1: 0, 2: 1}; 
        let xx = xxDict[i]; 

        for (let j = 0; j < filter.n; j++) {

            let yyDict = {0: -1, 1: 0, 2: 1}; 
            let yy = yyDict[j];

            result += Jimp.intToRGBA(image.getPixelColor(x+xx, y+yy))[color] * filtered[i*filter.m+j];
        }
    }

    result = result / 9;
    //console.log(result);
    if(result > 255)
        result = 255;
    return result;
}

function applyMask(){

}

module.exports = {
    getImage,
    writeImage,
    getRGBMatrix,
    filtroDeMedia
}