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
        context.fillStyle = "rgb(" + parseInt(r, 10) + "," +
                parseInt(g, 10) + "," + parseInt(b, 10) + ")";
        context.fillRect(x, y, 1, 1);
        context.restore();
    },

    /*
     * The easy case.  We take advantage of JavaScript's "optional"
     * parameter mechanism to keep things at a single method.
     */
    fillRect: function (context, x, y, w, h, c1, c2, c3, c4) {
        var module = this,
            i,
            j,
            bottom = y + h,
            right = x + w,
            leftColor = c1 ? [c1[0], c1[1], c1[2]] : c1,
            rightColor = c2 ? [c2[0], c2[1], c2[2]] : c2,
            leftVDelta,
            rightVDelta,
            hDelta,
            currentColor,

            // We have four subcases: zero, one, two, or four colors
            // supplied.  The three-color case will be treated as if
            // the third and fourth colors are the same.  Instead of
            // embedding different logic into a single loop, we just
            // break them up.  This allows each case to be "optimal"
            // and simplifies reading the code.  There *is* some
            // duplicate code, but in this case the benefits outweigh
            // the cost.
            fillRectNoColor = function () {
                // The rendering context will just ignore the
                // undefined colors in this case.
                for (i = y; i < bottom; i += 1) {
                    for (j = x; j < right; j += 1) {
                        module.setPixel(context, j, i);
                    }
                }
            },

            fillRectOneColor = function () {
                // Single color all the way through.
                for (i = y; i < bottom; i += 1) {
                    for (j = x; j < right; j += 1) {
                        module.setPixel(context, j, i, c1[0], c1[1], c1[2]);
                    }
                }
            },

            fillRectTwoColors = function () {
                // This modifies the color vertically only.
                for (i = y; i < bottom; i += 1) {
                    for (j = x; j < right; j += 1) {
                        module.setPixel(context, j, i,
                                leftColor[0],
                                leftColor[1],
                                leftColor[2]);
                    }

                    // Move to the next level of the gradient.
                    leftColor[0] += leftVDelta[0];
                    leftColor[1] += leftVDelta[1];
                    leftColor[2] += leftVDelta[2];
                }
            },

            fillRectFourColors = function () {
                for (i = y; i < bottom; i += 1) {
                    // Move to the next "vertical" color level.
                    currentColor = [leftColor[0], leftColor[1], leftColor[2]];
                    hDelta = [(rightColor[0] - leftColor[0]) / w,
                              (rightColor[1] - leftColor[1]) / w,
                              (rightColor[2] - leftColor[2]) / w];

                    for (j = x; j < right; j += 1) {
                        module.setPixel(context, j, i,
                                currentColor[0],
                                currentColor[1],
                                currentColor[2]);

                        // Move to the next color horizontally.
                        currentColor[0] += hDelta[0];
                        currentColor[1] += hDelta[1];
                        currentColor[2] += hDelta[2];
                    }

                    // The color on each side "grades" at different rates.
                    leftColor[0] += leftVDelta[0];
                    leftColor[1] += leftVDelta[1];
                    leftColor[2] += leftVDelta[2];
                    rightColor[0] += rightVDelta[0];
                    rightColor[1] += rightVDelta[1];
                    rightColor[2] += rightVDelta[2];
                }
            };

        // Depending on which colors are supplied, we call a different
        // version of the fill code.
        if (!c1) {
            fillRectNoColor();
        } else if (!c2) {
            fillRectOneColor();
        } else if (!c3) {
            // For this case, we set up the left vertical deltas.
            leftVDelta = [(c2[0] - c1[0]) / h,
                      (c2[1] - c1[1]) / h,
                      (c2[2] - c1[2]) / h];
            fillRectTwoColors();
        } else {
            // The four-color case, with a quick assignment in case
            // there are only three colors.
            c4 = c4 || c3;

            // In primitives, one tends to see repeated code more
            // often than function calls, because this is the rare
            // situation where function call overhead costs more
            // than repeated code.
            leftVDelta = [(c3[0] - c1[0]) / h,
                      (c3[1] - c1[1]) / h,
                      (c3[2] - c1[2]) / h];
            rightVDelta = [(c4[0] - c2[0]) / h,
                      (c4[1] - c2[1]) / h,
                      (c4[2] - c2[2]) / h];
            fillRectFourColors();
        }
    }
};
