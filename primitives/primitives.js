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
    },

    /*
     * The easy case.  We take advantage of JavaScript's "optional"
     * parameter mechanism to keep things at a single method.
     */
    fillRect: function (context, x, y, w, h, c1, c2, c3, c4) {
        var i,
            j,
            bottom = y + h,
            right = x + w,
            leftColor = c1 ? [c1[0], c1[1], c1[2]] : c1,
            rightColor = c2 ? [c2[0], c2[1], c2[2]] : c2,
            leftVDelta,
            rightVDelta,
            hDelta,
            currentColor;

        // A little more color logic: if we get just two colors,
        // we set it up so that leftColor and rightColor are the
        // same (i.e., strict vertical gradient).
        if (c2 && !(c3 && c4)) {
            c3 = c2;
            c4 = c2;
            c2 = c1;
            rightColor = leftColor;
        }

        // At this point, the existence of a second color means
        // we have all four colors, so we proceed with the four-
        // color case.  This means that the vertical-only gradient
        // is suboptimal.
        if (c2) {
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
        }

        // Now we loop.
        for (i = y; i < bottom; i += 1) {
            if (leftColor) {
                currentColor = [leftColor[0], leftColor[1], leftColor[2]];
            }
            if (leftColor && rightColor) {
                hDelta = [(rightColor[0] - leftColor[0]) / w,
                          (rightColor[1] - leftColor[1]) / w,
                          (rightColor[2] - leftColor[2]) / w];
            }
            for (j = x; j < right; j += 1) {
                if (leftColor) {
                    this.setPixel(context, j, i,
                            currentColor[0],
                            currentColor[1],
                            currentColor[2]);
                } else {
                    this.setPixel(context, j, i);
                }

                if (hDelta) {
                    currentColor[0] += hDelta[0];
                    currentColor[1] += hDelta[1];
                    currentColor[2] += hDelta[2];
                }
            }

            // It is sufficient to check whether leftVDelta has been defined.
            if (leftVDelta) {
                leftColor[0] += leftVDelta[0];
                leftColor[1] += leftVDelta[1];
                leftColor[2] += leftVDelta[2];
                rightColor[0] += rightVDelta[0];
                rightColor[1] += rightVDelta[1];
                rightColor[2] += rightVDelta[2];
            }
        }
    }
};
