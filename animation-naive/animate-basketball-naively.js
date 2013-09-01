(function () {
    var canvas = document.getElementById("court"),
        renderingContext = canvas.getContext("2d"),

        // These variables represent how the ball is moving.
        xStep = 4,
        yStep = -5,

        // Variables to represent the absolute position, rotation, and
        // scaling of the ball.  We start the ball at the bottom-left
        // of the canvas.
        x = 5,
        y = 300,
        angle = 0,

        // This is the money function: the frame advancer.
        nextFrame = function () {
            // Always return to the same state after each iteration.
            renderingContext.save();

            // Clear the canvas.
            renderingContext.clearRect(0, 0, canvas.width, canvas.height);

            // Note the use of transforms here.
            // Move the ball to the current position.
            renderingContext.translate(x, y);

            // Rotate the ball.
            renderingContext.rotate(angle);

            // *Now* draw.
            drawBasketball(renderingContext);

            // Calculate the new position, rotation, and scale.
            x += xStep;
            y += yStep;
            angle += Math.PI / 180; // 1 degree.

            // Quick check to see if the ball has hit an edge
            // This results in a "bounce."
            if (x + xStep > canvas.width || x + xStep < 0) {
                xStep = -xStep;
            }

            if (y + yStep > canvas.height || y + yStep < 0) {
                yStep = -yStep;
            }

            // Put everything back together.
            renderingContext.restore();
        };

    // We're going for approximately 30 frames per second.
    setInterval(nextFrame, 33);
}());
