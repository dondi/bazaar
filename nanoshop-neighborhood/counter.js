// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.Counter = (function () {
        var counterHeight = 120;
        var counterWidth = 400;
        var counterTopWidth = 16;
        var mainColor = "#57442A";
        var shadowColor = "#47341A";

        var drawBase = function (renderingContext) {
            renderingContext.fillStyle = mainColor;
            renderingContext.fillRect(
                -(counterWidth / 2), -(counterHeight / 2), 
                counterWidth, counterHeight
            );

            renderingContext.fillStyle = shadowColor;
            renderingContext.fillRect(
                -(counterWidth / 2), -(counterHeight / 2), 
                counterWidth, counterHeight / 6
            );

            renderingContext.strokeStyle = mainColor;
            renderingContext.lineWidth = counterTopWidth;
            renderingContext.lineCap = "square";
            
            renderingContext.beginPath();
            renderingContext.moveTo(-(counterWidth / 2), -(counterHeight / 2));
            renderingContext.lineTo(counterWidth / 2, -(counterHeight / 2));
            renderingContext.stroke();
        };

        var drawCounter = function (renderingContext) {
            renderingContext.save();
            drawBase(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawCounter };
    })();
})();
