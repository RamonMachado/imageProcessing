const Jimp = require("jimp");

module.exports = class Filter{
    /** 
        @param {number} width Mask's width
        @param {number} height Mask's height
        @param {array} mask Mask matrix
        @param {function} apply Applies the filter on a given image. Returns a new image.
        @param {function} calculatePixelValue Calculate and returns the value of the given pivel
    */
    constructor(width, height, mask, apply, calculatePixelValue){
        this.width = width;
        this.height = height;
        this.mask = mask;
        if(apply)
            this.apply = apply;
        if(calculatePixelValue)
            this.calculatePixelValue = calculatePixelValue;
    }

    apply(image) {
        let imageWidth = image.getWidth();
        let imageHeight = image.getHeight();
        let newImage = Object.create(image);
    
        for (let i = 0; i < imageHeight; i++) {
            for (let j = 0; j < imageWidth; j++) {
                let pixel = {};
                pixel.r = this.calculatePixelValue(image, i, j, "r");
                pixel.g = this.calculatePixelValue(image, i, j, "g");
                pixel.b = this.calculatePixelValue(image, i, j, "b");
                pixel.a = Jimp.intToRGBA(image.getPixelColor(i, j))["a"];
    
                newImage.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), i, j);
            }
        }
        return newImage;
    }
    
    calculatePixelValue(image, x, y, color){
        let filtered = this.mask;
        let result = 0;
        for (let i = 0; i < this.width; i++) {
    
            let xxDict = {0: -1, 1: 0, 2: 1}; 
            let xx = xxDict[i]; 
    
            for (let j = 0; j < this.height; j++) {
    
                let yyDict = {0: -1, 1: 0, 2: 1}; 
                let yy = yyDict[j];
    
                result += Jimp.intToRGBA(image.getPixelColor(x+xx, y+yy))[color] * filtered[i*this.width+j];
            }
        }
    
        result = result / 9;
        //console.log(result);
        if(result > 255)
            result = 255;
        return result;
    }
}