/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
window.Nanoshop = {
    /*
     * A basic "darkener."
     */
    darkener: (x, y, r, g, b, a) => [ r / 2, g / 2, b / 2, a ],

    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (x, y, r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    applyFilter: (imageData, filter) => {
        // For every pixel, replace with something determined by the filter.
        let pixelArray = imageData.data;

        for (let i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            let pixelIndex = i / 4;

            let pixel = filter(
                pixelIndex % imageData.width, Math.floor(pixelIndex / imageData.height),
                pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]
            );

            for (let j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    }
};
