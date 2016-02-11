// Graphics by Angela Elgar: https://github.com/aelgar
(function () {
    window.Sprites = window.Sprites || { };
    window.Sprites.Shelf = (function () {
        var shelfHeight = 380;
        var shelfWidth = 180;
        var boardWidth = 10;
        var levelHeight = 70;
        var cabinetHeight = 100;

        var mainColor = "#7C6147";
        var shadowColor = "#3E352D";
            
        var drawBase = function (renderingContext) {
            renderingContext.fillStyle = mainColor;
            renderingContext.fillRect(-(shelfWidth / 2), -(shelfHeight / 2), shelfWidth, shelfHeight);
            
            renderingContext.fillStyle = shadowColor;
            renderingContext.fillRect(
                -(shelfWidth / 2) + boardWidth, -(shelfHeight / 2) + boardWidth,
                shelfWidth - (boardWidth * 2), shelfHeight - cabinetHeight
            );

            renderingContext.fillStyle = mainColor;
            for (var i = 0; i < 4; i += 1){
                renderingContext.fillRect(
                    -(shelfWidth / 2), -(shelfHeight / 2) + (levelHeight * i),
                    shelfWidth, boardWidth
                );
            }
            
            renderingContext.strokeStyle = shadowColor;
            renderingContext.lineWidth = 4;
            renderingContext.lineJoin = "round";
            renderingContext.strokeRect(
                -(shelfWidth / 2) + boardWidth, (shelfHeight / 2) - cabinetHeight + (boardWidth * 2),
                shelfWidth - (boardWidth * 2), levelHeight
            );
            
            renderingContext.beginPath();
            renderingContext.moveTo(0, (shelfHeight / 2) - cabinetHeight + (boardWidth * 2));
            renderingContext.lineTo(0, (shelfHeight / 2) - boardWidth);
            renderingContext.stroke();
        };

        var drawShelf = function (renderingContext) {
            renderingContext.save();
            drawBase(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawShelf };
    })();
})();
