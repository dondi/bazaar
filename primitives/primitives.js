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
     * The easy fill case: rectangles.  We take advantage of JavaScript's
     * "optional" parameter mechanism to keep things at a single method.
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
    },

    /*
     * Here come our line-drawing primitives.  Note, for simplicity, that
     * we code for a specific case of a diagonal line going up.  Other cases
     * either switch directions or have specific optimizations (e.g., strictly
     * horizontal and vertical lines).
     */

    // Our digital-differential analyzer (DDA) version.
    lineDDA: function (context, x1, y1, x2, y2, color) {
        var steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)),
            dx = (x2 - x1) / steps,
            dy = (y2 - y1) / steps,
            x = x1,
            y = y1,
            color = color || [0, 0, 0],
            i;

        for (i = 0; i <= steps; i += 1) {
            this.setPixel(context, x, y, color[0], color[1], color[2]);
            x += dx; y += dy;
        }
    },

    // Bresenham algorithm version 1.
    lineBres1: function (context, x1, y1, x2, y2, color) {
        var x = x1,
            y = y1,
            dx = x2 - x1,
            dy = y1 - y2,
            err = 0,
            color = color || [0, 0, 0];

        while (true) {
            this.setPixel(context, x, y, color[0], color[1], color[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            err += dy / dx;
            if (err >= 0.5) {
                y -= 1;
                err -= 1;
            }
        }
    },

    // Bresenham algorithm version 2.
    lineBres2: function (context, x1, y1, x2, y2, color) {
        var x = x1,
            y = y1,
            dx = x2 - x1,
            dy = y1 - y2,
            err = 0,
            color = color || [0, 0, 0];

        while (true) {
            this.setPixel(context, x, y, color[0], color[1], color[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            err += (2 * dy);
            if (err >= dx) {
                y -= 1;
                err -= (2 * dx);
            }
        }
    },

    // Bresenham algorithm version 3.
    lineBres3: function (context, x1, y1, x2, y2, color) {
        var x = x1,
            y = y1,
            dx = x2 - x1,
            dy = y1 - y2,
            err = 0,
            color = color || [0, 0, 0];

        while (true) {
            this.setPixel(context, x, y, color[0], color[1], color[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            if (err >= dx - 2 * dy) {
                y -= 1;
                err += (2 * dy - 2 * dx);
            } else {
                err += (2 * dy);
            }
        }
    },

    // The final, optimized Bresenham algorithm
    lineBresenham: function (context, x1, y1, x2, y2, color) {
        var x = x1,
            y = y1,
            dx = x2 - x1,
            dy = y1 - y2,
            k1 = dy << 1,
            err = k1 - dx,
            k2 = (dy - dx) << 1,
            color = color || [0, 0, 0];

        while (true) {
            this.setPixel(context, x, y, color[0], color[1], color[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            if (err < 0) {
                err += k1;
            } else {
                y -= 1;
                err += k2;
            }
        }
    }

};
