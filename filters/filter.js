const Jimp = require("jimp");

module.exports = class Filter{
    /** 
        @param {number} width Mask's width
        @param {number} height Mask's height
        @param {array} masks Array of masks
        @param {object} options You can override some methods by inclunding them in the options object. Methods supported: apply, resultFunction, calculatePixelValue
    */
    constructor(width, height, masks, options){
        this.width = width;
        this.height = height;
        this.masks = masks;
        if(options){
            this.apply = options.apply ? options.apply : this.apply;
            this.calculatePixelValue = options.calculatePixelValue ? options.calculatePixelValue : this.calculatePixelValue;
            this.resultFunction = options.resultFunction ? options.resultFunction : this.resultFunction;
        }
    }

    apply(image) {
        let newImage = Object.create(image);
        for(let mask of this.masks){
            newImage = this.applyMask(newImage, mask);
        }
        return newImage;
    }

    applyMask(image, mask){
        let imageWidth = image.getWidth();
        let imageHeight = image.getHeight();
        let newImage = Object.create(image);
    
        for (let i = 0; i < imageWidth; i++) {
            for (let j = 0; j < imageHeight; j++) {
                let pixel = {};
                pixel.r = this.calculatePixelValue(image, i, j, mask, "r");
                pixel.g = this.calculatePixelValue(image, i, j, mask, "g");
                pixel.b = this.calculatePixelValue(image, i, j, mask, "b");
                pixel.a = Jimp.intToRGBA(image.getPixelColor(i, j))["a"];
    
                newImage.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), i, j);
            }
        }
        return newImage;
    }
    
    calculatePixelValue(image, x, y, mask, color){

        let result = 0;
        let neighborhood = this.getNeighborhood(image, x, y, this.width, this.height, color);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                result += this.resultFunction(neighborhood[i][j], mask[i][j]);
            }
        }
    
        result = result <= 255 ? result : 255;
        result = result >= 0 ? result : 0;

        return result;
    }

    resultFunction(neighborValue, maskValue){
        return neighborValue * maskValue;
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