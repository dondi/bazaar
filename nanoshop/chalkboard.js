// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.Chalkboard = (function () {
        var boardWidth = 90;
        var boardHeight = 120;
        var borderWidth = 5;
        var marginLeft = -30;

        var mainColor = "#3B464B";
        var borderColor = "#AC8054";
        var fontColor = "#DDCCCC";

        var menuA = [
            "muffins", "coffee, juice, and tea",
            "donuts and assorted pastries", "breakfast special",
            "probably a burrito"
        ];

        var menuB = [
            "lunch special", "sandwiches and paninis",
            "tasty soup hell yea", "soup in a bread bowl",
            "personal sized pizza", "salad (caesar or house)"
        ];

        var drawBase = function (renderingContext, options) {
            renderingContext.fillStyle = mainColor;
            renderingContext.fillRect(-(boardWidth / 2), -(boardHeight / 2), boardWidth, boardHeight);
            renderingContext.strokeStyle = borderColor;
            renderingContext.lineJoin = "round";
            renderingContext.lineWidth = borderWidth;
            renderingContext.strokeRect(-(boardWidth / 2), -(boardHeight / 2), boardWidth, boardHeight);

            menuItems = (options.variation !== "B") ? menuA : menuB;

            renderingContext.strokeStyle = fontColor;
            renderingContext.lineWidth = 1;
            renderingContext.font = "18px serif";
            renderingContext.strokeText("menu", -25, -35);
            renderingContext.font = "5px serif";
            for (var i = 0; i < menuItems.length; i += 1) {
                renderingContext.strokeText(menuItems[i], marginLeft, -10 + (i * 10));
            }
        };

        var drawChalkboard = function (renderingContext, options) {
            renderingContext.save();
            drawBase(renderingContext, options);
            renderingContext.restore();
        };

        return { draw: drawChalkboard };
    })();
})();
