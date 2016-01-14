/*
 * This program demonstrates the usefulness of separating your drawn object
 * data from the code that actually does the drawing.  Note here how we can
 * show both bezier curves and their relevant vertices without having to
 * duplicate the vertex coordinates.  This approach also avoids duplicate work
 * if the curves' vertices need to be changed.
 */
// Another minor change: we use jQuery here, just to illustrate how you can
// encapsulate code and get to the canvas element in that way.
$(function () {
    var canvas = $("#canvas")[0]; // Note the array dereference.
    var renderingContext = canvas.getContext("2d");

    // The curve data.
    var curve = {
        startPoint: { x: 10, y: 50 },
        controlPoint1: { x: 70, y: 10 },
        controlPoint2: { x: 80, y: 90 },
        endPoint: { x: 50, y: 100 }
    };

    // Now, we can draw the curve's vertices...
    renderingContext.strokeStyle = "rgba(200, 200, 200, 0.5)";
    renderingContext.beginPath();
    renderingContext.moveTo(curve.startPoint.x, curve.startPoint.y);
    renderingContext.lineTo(curve.controlPoint1.x, curve.controlPoint1.y);
    renderingContext.lineTo(curve.controlPoint2.x, curve.controlPoint2.y);
    renderingContext.lineTo(curve.endPoint.x, curve.endPoint.y);
    renderingContext.stroke();

    // ...and the curve itself, without duplicating values.
    renderingContext.strokeStyle = "red";
    renderingContext.lineWidth = 3;
    renderingContext.beginPath();
    renderingContext.moveTo(curve.startPoint.x, curve.startPoint.y);
    renderingContext.bezierCurveTo(
        curve.controlPoint1.x, curve.controlPoint1.y,
        curve.controlPoint2.x, curve.controlPoint2.y,
        curve.endPoint.x, curve.endPoint.y
    );
    renderingContext.stroke();

    // If you need to draw multiple curves, you will then want to put the
    // curve-drawing code in a function, with the curve data declared as a
    // parameter to that function.  Styles may be parameterized also for
    // even better flexibility without unnecessarily duplicating code.
});
// ^Note how we don't call the function anymore; jQuery will.
