// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.Wall = (function () {
        var wallHeight = 400;
        var wallWidth = 800;

        var stripeCount = 9;
        var lineThickness = 4;
        var accentHeightRatio = .40;
        var accentPanelWidth = 40;

        var baseColor = "#4C4537";
        var stripeColor = "#7B9080";
        var accentColor = "#6A5B47";
        var accentLines = "#504030";

        var stripeWidth = wallWidth / stripeCount;
        var accentHeight = wallHeight * accentHeightRatio;

        var drawBase = function (renderingContext, options) {
            renderingContext.fillStyle = baseColor;
            renderingContext.strokeStyle = baseColor;
            renderingContext.lineWidth = lineThickness;
            renderingContext.fillRect(-(wallWidth / 2), -(wallHeight / 2), wallWidth, wallHeight);
            renderingContext.strokeRect(-(wallWidth / 2), -(wallHeight / 2), wallWidth, wallHeight);
            
            if (options.hasStripes) {
                renderingContext.fillStyle = stripeColor;
                for (var i = 0; i < stripeCount; i += 2) {
                    renderingContext.fillRect(
                        -(wallWidth / 2) + stripeWidth * i,
                        -(wallHeight / 2), stripeWidth, wallHeight
                    );
                }
            }
        };

        var drawAccent = function (renderingContext) {
            renderingContext.fillStyle = accentColor;
            renderingContext.strokeStyle = accentLines;
            
            renderingContext.fillRect(-(wallWidth / 2), ((wallHeight / 2) - accentHeight), wallWidth, accentHeight);
            renderingContext.strokeRect(-(wallWidth / 2), ((wallHeight / 2) - accentHeight), wallWidth, accentHeight);
            
            for (var i = 0; i < (wallWidth / accentPanelWidth) / 2 - 1; i += 1) {
                renderingContext.strokeRect(
                    -(wallWidth / 2) + stripeWidth * i, ((wallHeight / 2) - accentHeight),
                    accentPanelWidth, accentHeight
                );
            }
            
            renderingContext.fillRect(
                -(wallWidth / 2), (wallHeight / 2) - accentHeight,
                wallWidth, accentPanelWidth / 2
            );

            renderingContext.strokeRect(
                -(wallWidth / 2), (wallHeight / 2) - accentHeight,
                wallWidth, accentPanelWidth / 2
            );
        }

        var drawWall = function (renderingContext, options) {
            renderingContext.save();
            drawBase(renderingContext, options);
            
            if (options.hasAccent) {
                drawAccent(renderingContext);
            }
            
            renderingContext.restore();
        };

        return { draw: drawWall };
    })();
})();
