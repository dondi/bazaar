/*
 * A module demonstrating assorted algorithms for selected 2D graphics
 * operations.
 */
(() => {

    /*
     * This is the cornerstone: we promise not to use any other graphics
     * operation but this one.
     */
    let setPixel = (context, x, y, r, g, b) => {
        context.save();
        context.fillStyle = "rgb(" + parseInt(r, 10) + "," + parseInt(g, 10) + "," + parseInt(b, 10) + ")";
        context.fillRect(x, y, 1, 1);
        context.restore();
    };

    /*
     * The easy fill case: rectangles.  We take advantage of JavaScript's
     * "optional" parameter mechanism to keep things at a single method.
     */
    let fillRect = (context, x, y, w, h, c1, c2, c3, c4) => {
        let bottom = y + h;
        let right = x + w;
        let leftColor = c1 ? [c1[0], c1[1], c1[2]] : c1;
        let rightColor = c2 ? [c2[0], c2[1], c2[2]] : c2;
        let leftVDelta;
        let rightVDelta;

        // We have four subcases: zero, one, two, or four colors
        // supplied.  The three-color case will be treated as if
        // the third and fourth colors are the same.  Instead of
        // embedding different logic into a single loop, we just
        // break them up.  This allows each case to be "optimal"
        // and simplifies reading the code.  There *is* some
        // duplicate code, but in this case the benefits outweigh
        // the cost.
        let fillRectNoColor = () => {
            // The rendering context will just ignore the
            // undefined colors in this case.
            for (let i = y; i < bottom; i += 1) {
                for (let j = x; j < right; j += 1) {
                    setPixel(context, j, i);
                }
            }
        };

        let fillRectOneColor = () => {
            // Single color all the way through.
            for (let i = y; i < bottom; i += 1) {
                for (let j = x; j < right; j += 1) {
                    setPixel(context, j, i, ...c1);
                }
            }
        };

        let fillRectTwoColors = () => {
            // This modifies the color vertically only.
            for (let i = y; i < bottom; i += 1) {
                for (let j = x; j < right; j += 1) {
                    setPixel(context, j, i, ...leftColor);
                }

                // Move to the next level of the gradient.
                leftColor[0] += leftVDelta[0];
                leftColor[1] += leftVDelta[1];
                leftColor[2] += leftVDelta[2];
            }
        };

        let fillRectFourColors = () => {
            for (let i = y; i < bottom; i += 1) {
                // Move to the next "vertical" color level.
                let currentColor = [leftColor[0], leftColor[1], leftColor[2]];
                let hDelta = [(rightColor[0] - leftColor[0]) / w,
                    (rightColor[1] - leftColor[1]) / w,
                    (rightColor[2] - leftColor[2]) / w];

                for (let j = x; j < right; j += 1) {
                    setPixel(context, j, i, ...currentColor);

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
    };

    /*
     * Here come our line-drawing primitives.  Note, for simplicity, that
     * we code for a specific case of a diagonal line going up.  Other cases
     * either switch directions or have specific optimizations (e.g., strictly
     * horizontal and vertical lines).
     */

    // Our digital-differential analyzer (DDA) version.
    let lineDDA = (context, x1, y1, x2, y2, color) => {
        let steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        let dx = (x2 - x1) / steps;
        let dy = (y2 - y1) / steps;
        let x = x1;
        let y = y1;

        color = color || [0, 0, 0];
        for (let i = 0; i <= steps; i += 1) {
            setPixel(context, x, y, ...color);
            x += dx;
            y += dy;
        }
    };

    // Bresenham algorithm version 1.
    let lineBres1 = (context, x1, y1, x2, y2, color) => {
        let x = x1;
        let y = y1;
        let dx = x2 - x1;
        let dy = y1 - y2;
        let err = 0;

        color = color || [0, 0, 0];
        while (true) {
            setPixel(context, x, y, ...color);
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
    };

    // Bresenham algorithm version 2.
    let lineBres2 = (context, x1, y1, x2, y2, color) => {
        let x = x1;
        let y = y1;
        let dx = x2 - x1;
        let dy = y1 - y2;
        let err = 0;

        color = color || [0, 0, 0];
        while (true) {
            setPixel(context, x, y, ...color);
            if (x === x2) {
                return;
            }

            x += 1;
            // Note how this is "multiplying 2 * dx to both sides" when
            // compared to Bresenham 1.
            err += (2 * dy);
            if (err >= dx) {
                y -= 1;
                err -= (2 * dx);
            }
        }
    };

    // Bresenham algorithm version 3.
    let lineBres3 = (context, x1, y1, x2, y2, color) => {
        let x = x1;
        let y = y1;
        let dx = x2 - x1;
        let dy = y1 - y2;
        let err = 0;

        color = color || [0, 0, 0];
        while (true) {
            setPixel(context, x, y, ...color);
            if (x === x2) {
                return;
            }

            x += 1;
            // This one does the comparison first, then adjusts err
            // based on that comparison.
            if (err >= dx - 2 * dy) {
                y -= 1;
                err += (2 * dy - 2 * dx);
            } else {
                err += (2 * dy);
            }
        }
    };

    // The final, optimized Bresenham algorithm: here, we presave
    // most values, and adjust them to compare only to zero.
    let lineBresenham = (context, x1, y1, x2, y2, color) => {
        let x = x1;
        let y = y1;
        let dx = x2 - x1;
        let dy = y1 - y2;
        let k1 = dy << 1; // dy divided by 2.
        let err = k1 - dx;
        let k2 = (dy - dx) << 1; // dy - dx divided by 2.

        color = color || [0, 0, 0];
        while (true) {
            setPixel(context, x, y, ...color);
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
    };

    /*
     * Time for the circles.  First, we observe that it is sufficient
     * to compute one-eighth of a circle: the other seven portions are
     * permutations of that eighth's coordinates.  So we define a helper
     * function that all of the circle implementations will use...
     */
    let plotCirclePoints = (context, xc, yc, x, y, color) => {
        color = color || [0, 0, 0];
        setPixel(context, xc + x, yc + y, ...color);
        setPixel(context, xc + x, yc - y, ...color);
        setPixel(context, xc + y, yc + x, ...color);
        setPixel(context, xc + y, yc - x, ...color);
        setPixel(context, xc - x, yc + y, ...color);
        setPixel(context, xc - x, yc - y, ...color);
        setPixel(context, xc - y, yc + x, ...color);
        setPixel(context, xc - y, yc - x, ...color);
    };

    // First, the most naive possible implementation: circle by trigonometry.
    let circleTrig = (context, xc, yc, r, color) => {
        let theta = 1 / r;

        // At the very least, we compute our sine and cosine just once.
        let s = Math.sin(theta);
        let c = Math.cos(theta);

        // We compute the first octant, from zero to pi/4.
        let x = r;
        let y = 0;

        while (x >= y) {
            plotCirclePoints(context, xc, yc, x, y, color);
            x = x * c - y * s;
            y = x * s + y * c;
        }
    };

    // Now DDA.
    let circleDDA = (context, xc, yc, r, color) => {
        let epsilon = 1 / r;
        let x = r;
        let y = 0;

        while (x >= y) {
            plotCirclePoints(context, xc, yc, x, y, color);
            x = x - (epsilon * y);
            y = y + (epsilon * x);
        }
    };

    // One of three Bresenham-like approaches.
    let circleBres1 = (context, xc, yc, r, color) => {
        let p = 3 - 2 * r;
        let x = 0;
        let y = r;

        while (x < y) {
            plotCirclePoints(context, xc, yc, x, y, color);
            if (p < 0) {
                p = p + 4 * x + 6;
            } else {
                p = p + 4 * (x - y) + 10;
                y -= 1;
            }
            x += 1;
        }

        if (x === y) {
            plotCirclePoints(context, xc, yc, x, y, color);
        }
    };

    // And another...
    let circleBres2 = (context, xc, yc, r, color) => {
        let x = 0;
        let y = r;
        let e = 1 - r;
        let u = 1;
        let v = e - r;

        while (x <= y) {
            plotCirclePoints(context, xc, yc, x, y, color);
            if (e < 0) {
                x += 1;
                u += 2;
                v += 2;
                e += u;
            } else {
                x += 1;
                y -= 1;
                u += 2;
                v += 4;
                e += v;
            }
        }
    };

    // Last but not least...
    let circleBres3 = (context, xc, yc, r, color) => {
        let x = r;
        let y = 0;
        let e = 0;

        while (y <= x) {
            plotCirclePoints(context, xc, yc, x, y, color);
            y += 1;
            e += (2 * y - 1);
            if (e > x) {
                x -= 1;
                e -= (2 * x + 1);
            }
        }
    };

    /*
     * Now, the big one: a general polygon-filling algorithm.
     * We expect the polygon to be an array of objects with x
     * and y properties.
     */

    // For starters, we need an Edge helper object.
    let Edge = class {
        constructor(p1, p2) {
            this.maxY = Math.max(p1.y, p2.y);
            this.minY = Math.min(p1.y, p2.y);
            this.horizontal = (p1.y === p2.y);
            if (!this.horizontal) {
                this.inverseSlope = (p2.x - p1.x) / (p2.y - p1.y);
            }

            // The initial x coordinate is the x coordinate of the
            // point with the lower y value.
            this.currentX = (p1.y === this.minY) ? p1.x : p2.x;
        }
    };

    // Now to the function itself.
    let fillPolygon = (context, polygon, color) => {

        /*
         * A useful helper function: this "snaps" a given y coordinate
         * to its nearest scan line.
         */
        let toScanLine = y => Math.ceil(y);

        /*
         * We will need to sort edges by x coordinate.
         */
        let xComparator = (edge1, edge2) => edge1.currentX - edge2.currentX;

        /*
         * We will need to do "array difference:" return an array whose
         * elements are in the first array but not in the second.
         */
        let arrayDifference = (array1, array2) => array1.filter(element => array2.indexOf(element) < 0);

        /*
         * An important helper function: this moves the edges whose
         * minimum y match the given scan line from the source
         * list to the destination. We assume that the source list
         * is sorted by minimum y.
         */
        let moveMatchingMinYs = (src, dest, targetY) => {
            for (let i = 0, max = src.length; i < max; i += 1) {
                if (toScanLine(src[i].minY) === targetY) {
                    dest.push(src[i]);
                } else if (toScanLine(src[i].minY) > targetY) {
                    // We can bail immediately because the global edge list is sorted.
                    break;
                }
            }

            // Eliminate the moved edges from the source array; this is
            // the function's result.
            return arrayDifference(src, dest);
        };

        /*
         * Due to the relative complexity of this algorithm, we "pre-declare" variables here
         * so that we can easily attach comments that explain their role in the fill.
         */
        let globalEdgeList = []; // List of all edges.
        let activeEdgeList = []; // List of all edges currently being scanned.
        let anEdge;              // Temporary edge holder.
        let currentScanLine;     // The scan line that is being drawn.
        let drawPixel;           // Whether we are supposed to plot something.
        let fromX;               // The starting x coordinate of the current scan line.
        let toX;                 // The ending x coordinate of the current scan line.
        let edgesToRemove;       // For use when, well, removing edges from a list.

        // The usual color guard.
        color = color || [0, 0, 0];

        // Create the global edge list.
        for (let i = 0, max = polygon.length; i < max; i += 1) {
            // If we are at the last vertex, we go back to the first one.
            anEdge = new Edge(polygon[i], polygon[(i + 1) % polygon.length]);

            // We skip horizontal edges; they get drawn "automatically."
            if (!anEdge.horizontal) {
                globalEdgeList.push(anEdge);
            }
        }

        // Sort the list from top to bottom.
        globalEdgeList.sort((edge1, edge2) => (edge1.minY !== edge2.minY) ?
            edge1.minY - edge2.minY :

            // If the minimum y's are the same, then the edge with the
            // smaller x value goes first.
            edge1.currentX - edge2.currentX
        );

        // We start at the lowest y coordinate.
        currentScanLine = toScanLine(globalEdgeList[0].minY);

        // Initialize the active edge list.
        globalEdgeList = moveMatchingMinYs(globalEdgeList, activeEdgeList, currentScanLine);

        // Start scanning!
        drawPixel = false;
        while (activeEdgeList.length) {
            fromX = Number.MAX_VALUE;
            for (let i = 0, max = activeEdgeList.length; i < max; i += 1) {
                // If we're drawing pixels, we draw until we reach the x
                // coordinate of this edge. Otherwise, we just remember where we
                // are then move on.
                if (drawPixel) {
                    toX = toScanLine(activeEdgeList[i].currentX);

                    // No cheating here --- draw each pixel, one by one.
                    for (let x = fromX; x <= toX; x += 1) {
                        setPixel(context, x, currentScanLine, ...color);
                    }
                } else {
                    fromX = toScanLine(activeEdgeList[i].currentX);
                }

                drawPixel = !drawPixel;
            }

            // If we get out of this loop and drawPixel is true, then we
            // encountered an odd number of edges, and need to draw a single
            // pixel.
            if (drawPixel) {
                setPixel(context, fromX, currentScanLine, ...color);
                drawPixel = !drawPixel;
            }

            // Go to the next scan line.
            currentScanLine += 1;

            // Remove edges for which we have reached the maximum y.
            edgesToRemove = [];
            for (let i = 0, max = activeEdgeList.length; i < max; i += 1) {
                if (toScanLine(activeEdgeList[i].maxY) === currentScanLine) {
                    edgesToRemove.push(activeEdgeList[i]);
                }
            }
            activeEdgeList = arrayDifference(activeEdgeList, edgesToRemove);

            // Add edges for which we have reached the minimum y.
            globalEdgeList = moveMatchingMinYs(globalEdgeList, activeEdgeList, currentScanLine);

            // Update the x coordinates of the active edges.
            for (let i = 0, max = activeEdgeList.length; i < max; i += 1) {
                activeEdgeList[i].currentX += activeEdgeList[i].inverseSlope;
            }

            // Re-sort the edge list.
            activeEdgeList.sort(xComparator);
        }
    };

    window.Primitives = {
        setPixel,
        fillRect,
        lineDDA,
        lineBres1,
        lineBres2,
        lineBres3,
        lineBresenham,
        circleTrig,
        circleDDA,
        circleBres1,
        circleBres2,
        circleBres3,
        fillPolygon
    };
})();
