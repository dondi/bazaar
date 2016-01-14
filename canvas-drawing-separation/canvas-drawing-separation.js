/*
 * This program builds on the canvas drawing separation example by now
 * separating the drawing code as a function.  This lets you draw the
 * same kind of object multiple times, with varying settings.
 */
$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    // The curve data---two of them now, with styles.
    var curves = [
        {
            startPoint: { x: 10, y: 50 },
            controlPoint1: { x: 70, y: 10 },
            controlPoint2: { x: 80, y: 90 },
            endPoint: { x: 50, y: 100 },

            vertexStrokeStyle: "rgba(200, 200, 200, 0.5)",
            vertexLineWidth: 1,
            curveStrokeStyle: "red",
            curveLineWidth: 3
        },

        {
            // Note the negatives.
            startPoint: { x: -40, y: 50 },
            controlPoint1: { x: -70, y: -30 },
            controlPoint2: { x: 70, y: -60 },
            endPoint: { x: 40, y: 75 },

            vertexStrokeStyle: "rgb(0, 100, 100)",
            vertexLineWidth: 1,
            curveStrokeStyle: "blue",
            curveLineWidth: 5
        },
    ];

    // And finally, the actual curve drawing is now a function.
    var drawCurve = function (curve) {
        // Draw the curve's vertices.
        renderingContext.strokeStyle = curve.vertexStrokeStyle;
        renderingContext.lineWidth = curve.vertexLineWidth;
        renderingContext.beginPath();
        renderingContext.moveTo(curve.startPoint.x, curve.startPoint.y);
        renderingContext.lineTo(curve.controlPoint1.x, curve.controlPoint1.y);
        renderingContext.lineTo(curve.controlPoint2.x, curve.controlPoint2.y);
        renderingContext.lineTo(curve.endPoint.x, curve.endPoint.y);
        renderingContext.stroke();

        // Draw the curve itself.
        renderingContext.strokeStyle = curve.curveStrokeStyle;
        renderingContext.lineWidth = curve.curveLineWidth;
        renderingContext.beginPath();
        renderingContext.moveTo(curve.startPoint.x, curve.startPoint.y);
        renderingContext.bezierCurveTo(
            curve.controlPoint1.x, curve.controlPoint1.y,
            curve.controlPoint2.x, curve.controlPoint2.y,
            curve.endPoint.x, curve.endPoint.y
        );
        renderingContext.stroke();
    };

    // We'll use these loop variables later.  But, to match JavaScript
    // semantics, we declare them here.
    var i, max;

    // This is when the drawing actually happens.
    drawCurve(curves[0]);
    drawCurve(curves[1]);

    // But the second curve is out of bounds as defined---let's use
    // a transform to bring it in.
    renderingContext.translate(150, 150);
    drawCurve(curves[1]);

    // With our data and code separated this cleanly, we can draw
    // curves to our heart's content...
    renderingContext.translate(150, 0);
    for (i = 0, max = 5; i < max; i += 1) {
        renderingContext.rotate(Math.PI / 12.0);
        renderingContext.scale(1.2, 1.3);
        drawCurve(curves[0]);
    }
});
