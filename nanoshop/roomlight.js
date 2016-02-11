// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.RoomLight = (function () {
        var shadeHoldWidth = 50;
        var shadeHoldHeight = 15;
        var shadeRadius = 50;
        var lightRadius = 400;
        var rodLength = 120;
        var rodWidth = 8;
        var DEFAULT_BRIGHTNESS = 0;
        
        var baseColor = "#404035";
        var lightColorRGB = "250, 240, 150";
        var transparent = "rgba(255, 255, 255, 0)";

        var drawLight = function (renderingContext, options) {
            var brightness = +(options.brightness || DEFAULT_BRIGHTNESS);
            
            var radialGradient = renderingContext.createRadialGradient(
                0, shadeRadius, 1, 
                0, shadeRadius, lightRadius
            );

            radialGradient.addColorStop(0, "rgba(" + lightColorRGB + "," + brightness + ")");
            radialGradient.addColorStop(1, transparent);
            
            renderingContext.fillStyle = radialGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.arc(0, lightRadius, lightRadius, 0, Math.PI, false);
            renderingContext.fill();
        }
            
        var drawShade = function (renderingContext) {
            renderingContext.fillStyle = baseColor;
            renderingContext.strokeStyle = baseColor;
            
            renderingContext.fillRect(
                -(shadeHoldWidth / 2), -(shadeHoldHeight / 2), 
                shadeHoldWidth, shadeHoldHeight
            );
            
            renderingContext.beginPath();
            renderingContext.arc(0, shadeRadius, shadeRadius, 0, Math.PI, true);
            renderingContext.fill();
            
            renderingContext.lineWidth = rodWidth;
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.lineTo(0, -rodLength);
            renderingContext.closePath();
            renderingContext.stroke();
        };

        var drawRoomLight = function (renderingContext, options) {
            renderingContext.save();
            drawLight(renderingContext, options);
            drawShade(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawRoomLight };
    })();
})();
