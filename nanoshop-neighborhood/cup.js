// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.Cup = (function () {
        var cupHeight = 120;
        var cupWidth = 200;
        var handleThickness = 15;
        var steamHeight = 60;
        var steamThickness = handleThickness / 2;
        var steamYOffset = -(cupHeight * 0.75);

        var DEFAULT_COLOR = "SteelBlue";
        var DEFAULT_STEAM_RGB = "170, 220, 230";
        var DEFAULT_STEAM_OPACITY = 0;

        var handleCurve = {
            ctrlPt1: { x: cupWidth, y: cupHeight * -0.8 },
            ctrlPt2: { x: cupWidth * 0.8, y: cupHeight * 0.7 },
            endPt: { x: 0, y: cupHeight * 0.2 }
        };

        var steamCurve = {
            ctrlPt1: { x: -20, y: steamYOffset - (steamHeight / 2) },
            ctrlPt2: { x: 20, y: steamYOffset - steamHeight - (steamHeight / 2) }
        };

        var drawBase = function (renderingContext) {
            renderingContext.beginPath();
            renderingContext.moveTo(-(cupWidth / 2), -(cupHeight / 2));
            renderingContext.lineTo(cupWidth / 2, -(cupHeight / 2));
            renderingContext.quadraticCurveTo(cupWidth / 2, cupHeight / 2, 0, cupHeight / 2);
            renderingContext.quadraticCurveTo(-(cupWidth / 2), cupHeight / 2, -(cupWidth / 2), -(cupHeight / 2));
            renderingContext.fill();
        };

        var drawHandle = function (renderingContext) {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.bezierCurveTo(
                handleCurve.ctrlPt1.x, handleCurve.ctrlPt1.y, 
                handleCurve.ctrlPt2.x, handleCurve.ctrlPt2.y, 
                handleCurve.endPt.x, handleCurve.endPt.y
            );
            renderingContext.lineWidth = handleThickness;
            renderingContext.stroke();
            renderingContext.closePath();
            renderingContext.restore();
        }

        var drawSteamCurve = function (renderingContext, xOffset, yOffset) {
            renderingContext.beginPath();
            renderingContext.moveTo(xOffset, steamYOffset + yOffset);
            renderingContext.quadraticCurveTo(
                steamCurve.ctrlPt1.x + xOffset, steamCurve.ctrlPt1.y + yOffset, 
                xOffset, steamYOffset - steamHeight + yOffset
            );
            renderingContext.quadraticCurveTo(
                steamCurve.ctrlPt2.x + xOffset, steamCurve.ctrlPt2.y + yOffset, 
                xOffset, steamYOffset - steamHeight * 2 + yOffset
            );
            renderingContext.stroke();
            renderingContext.closePath()   
        }

        var drawSteamSet = function (renderingContext, options) {
            opacity = options.steamOpacity || DEFAULT_STEAM_OPACITY;
            renderingContext.save();
            renderingContext.strokeStyle = "rgba(" + DEFAULT_STEAM_RGB + "," + opacity + ")";
            renderingContext.lineWidth = steamThickness;
            renderingContext.lineCap = "round";
            drawSteamCurve(renderingContext, 0, -10);
            drawSteamCurve(renderingContext, -50, +10);
            drawSteamCurve(renderingContext, 50, +10);
            renderingContext.restore();
        }

        var drawCup = function (renderingContext, options) {
            renderingContext.save();

            var color = options.color || DEFAULT_COLOR;
            renderingContext.fillStyle = color;
            renderingContext.strokeStyle = color;
            
            drawHandle(renderingContext);
            drawBase(renderingContext);
            
            if (options.steam || options.steamOpacity){
                drawSteamSet(renderingContext, options);
            }

            renderingContext.restore();
        };

        return { draw: drawCup };
    })();
})();
