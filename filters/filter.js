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
    
        for (let i = 0; i < imageWidth; i++) {
            for (let j = 0; j < imageHeight; j++) {
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

        let result = 0;

        let neighborhood = this.getNeighborhood(image, x, y, this.width, this.height, color);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                result += neighborhood[i][j] * this.mask[i][j];
            }
        }
    
        result = result <= 255 ? result : 255;
        result = result >= 0 ? result : 0;

        return result;
    }

    getNeighborhood(image, x, y, width, height, color){

        let widthCenter = Math.floor(width / 2) + 1;
        let heightCenter = Math.floor(height / 2) + 1;

        let neighborhood = (new Array(width)).fill(new Array(height));

        let xIndex = -1*(widthCenter-1);

        for(let i = 0; i < width; i++){

            let yIndex = -1*(heightCenter-1);

            for(let j = 0; j < height; j++){

                let pixel = Jimp.intToRGBA(image.getPixelColor(x+xIndex, y+yIndex))[color];
                neighborhood[i][j] = pixel ? pixel : 0;
                
                yIndex++;
            }

            xIndex++;
        }

        return neighborhood;
    }
}