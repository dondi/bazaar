(function () {
    var canvas = document.getElementById("court"),
        renderingContext = canvas.getContext("2d"),

        // These variables represent how the ball is moving.
        xVelocity = 150,
        yVelocity = -150,

        // Variables to represent the absolute position, rotation, and
        // scaling of the ball.  We start the ball at the bottom-left
        // of the canvas.
        x = 5,
        y = 300,
        angle = 0,

        // This is the money function: the frame advancer.
        previousTimestamp = null,
        nextFrame = function (timestamp) {
            // Initialize the timestamp.
            if (!previousTimestamp) {
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Calculate the new position, rotation, and scale.
            var progress = (timestamp - previousTimestamp) / 1000;
            if (progress < 0.015) {
                // Do nothing if it's too soon.
                window.requestAnimationFrame(nextFrame);
                return;
            }

            var xStep = xVelocity * progress,
                yStep = yVelocity * progress;

            x += xStep;
            y += yStep;
            angle += (Math.PI / 6) * progress;

            // Quick check to see if the ball has hit an edge
            // This results in a "bounce."
            if (x + xStep > canvas.width || x + xStep < 0) {
                xVelocity = -xVelocity;
            }

            if (y + yStep > canvas.height || y + yStep < 0) {
                yVelocity = -yVelocity;
            }

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

            // Put everything back together.
            renderingContext.restore();

            // Request the next frame.
            previousTimestamp = timestamp;
            window.requestAnimationFrame(nextFrame);
        };

    // Ready set go!
    window.requestAnimationFrame(nextFrame);
}());
