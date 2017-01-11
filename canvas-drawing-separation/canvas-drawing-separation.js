/*
 * This program builds on the canvas data separation example by now
 * separating the data as a _completely different file_ and also
 * separating the drawing code as a function.  This lets you draw
 * the same kind of object multiple times, with varying settings.
 */
$(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // Look ma, no more curves array! That's because we've cleanly separated the
    // curve data as a separately downloadable JSON file.

    // And finally, the actual curve drawing is now a function.
    let drawCurve = (curve) => {
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

    // This draws the whole picture.
    let drawPicture = (curves) => {
        drawCurve(curves[0]);
        drawCurve(curves[1]);

        // But the second curve is out of bounds as defined---let's use
        // a transform to bring it in.
        renderingContext.translate(150, 150);
        drawCurve(curves[1]);

        // With our data and code separated this cleanly, we can draw
        // curves to our heart's content...
        renderingContext.translate(150, 0);
        for (let i = 0, max = 5; i < max; i += 1) {
            renderingContext.rotate(Math.PI / 12.0);
            renderingContext.scale(1.2, 1.3);
            drawCurve(curves[0]);
        }
    };

    // Now, we can just grab the data and draw. If we want to change the specific
    // characteristics of the curves, we just change the JSON. This code is unaffected.
    // Of course, if the overall _composition_ needs to be changed, then we would need
    // to modify the `drawPicture` function.
    //
    // Point to ponder: Is there a way to write `drawPicture` so that it would _never_
    // need to be rewritten?
    $.getJSON("curves.json").then(drawPicture);
});
