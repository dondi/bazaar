/*
 * A module demonstrating assorted algorithms for selected 2D graphics
 * operations.
 */
var Primitives = {
    /*
     * This is the cornerstone: we promise not to use any other graphics
     * operation but this one.
     */
    setPixel: function (context, x, y, r, g, b) {
        context.save();
        context.fillStyle = "rgb(" + parseInt(r) + "," +
                parseInt(g) + "," + parseInt(b) + ")";
        context.fillRect(x, y, 1, 1);
        context.restore();
    }
};
