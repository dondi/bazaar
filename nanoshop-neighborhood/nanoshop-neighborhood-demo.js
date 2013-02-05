/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    // Adapted from original code by Tyler Nichols.
    gradient = renderingContext.createRadialGradient(120, 120, 15, 120, 120, 75);
    gradient.addColorStop(0, "rgb(255, 102, 102)");
    gradient.addColorStop(1, "red");

    // Draw the sphere with a radial gradient
    renderingContext.beginPath();
    renderingContext.fillStyle = gradient;
    renderingContext.arc(150, 150, 75, 0, 2 * Math.PI, true);
    renderingContext.shadowColor = "gray";
    renderingContext.shadowBlur = 20;
    renderingContext.shadowOffsetX = 10;
    renderingContext.shadowOffsetY = 15;
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the top of the cube
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(140, 140, 140)";
    renderingContext.moveTo(300, 300);
    renderingContext.lineTo(335, 265);
    renderingContext.lineTo(435, 265);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(300, 300);
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the face of the cube
    renderingContext.fillStyle = "rgb(110, 110, 110)";
    renderingContext.fillRect(300, 300, 100, 100);

    // Draw the right side of the cube
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(79, 79, 79)";
    renderingContext.moveTo(435, 265);
    renderingContext.lineTo(435, 355);
    renderingContext.lineTo(400, 400);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(435, 265);
    renderingContext.fill();
    renderingContext.closePath();

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());
