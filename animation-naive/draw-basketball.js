var drawBasketball = function (renderingContext) {
    renderingContext.save();
    var gradient = renderingContext.createRadialGradient(-15, -15, 5, 15, 15, 75);
    gradient.addColorStop(0, "rgb(255, 130, 0)");
    gradient.addColorStop(0.75, "rgb(128, 65, 0)");
    gradient.addColorStop(1, "rgb(62, 32, 0)");
    renderingContext.fillStyle = gradient;

    renderingContext.beginPath();
    renderingContext.arc(0, 0, 50, 0, 2 * Math.PI, true);
    renderingContext.fill();

    renderingContext.strokeStyle = "black";
    renderingContext.lineWidth = 1;
    renderingContext.beginPath();
    renderingContext.moveTo(0, -49);
    renderingContext.bezierCurveTo(30, -35, 30, 35, 0, 49);
    renderingContext.moveTo(-49, 0);
    renderingContext.bezierCurveTo(-35, -30, 35, -30, 47, -15);
    renderingContext.moveTo(-35, 35);
    renderingContext.bezierCurveTo(0, -30, 50, -20, 45, 20);
    renderingContext.moveTo(-28, -40);
    renderingContext.bezierCurveTo(10, -35, 25, -35, 29, -40);
    renderingContext.stroke();
    renderingContext.restore();
};
