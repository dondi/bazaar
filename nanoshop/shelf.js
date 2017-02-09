// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.Shelf = (() => {
        const SHELF_HEIGHT = 380;
        const SHELF_WIDTH = 180;
        const BOARD_WIDTH = 10;
        const LEVEL_HEIGHT = 70;
        const CABINET_HEIGHT = 100;

        const MAIN_COLOR = "#7C6147";
        const SHADOW_COLOR = "#3E352D";

        let drawBase = (renderingContext) => {
            renderingContext.fillStyle = MAIN_COLOR;
            renderingContext.fillRect(-(SHELF_WIDTH / 2), -(SHELF_HEIGHT / 2), SHELF_WIDTH, SHELF_HEIGHT);

            renderingContext.fillStyle = SHADOW_COLOR;
            renderingContext.fillRect(
                -(SHELF_WIDTH / 2) + BOARD_WIDTH, -(SHELF_HEIGHT / 2) + BOARD_WIDTH,
                SHELF_WIDTH - (BOARD_WIDTH * 2), SHELF_HEIGHT - CABINET_HEIGHT
            );

            renderingContext.fillStyle = MAIN_COLOR;
            for (let i = 0; i < 4; i += 1){
                renderingContext.fillRect(
                    -(SHELF_WIDTH / 2), -(SHELF_HEIGHT / 2) + (LEVEL_HEIGHT * i),
                    SHELF_WIDTH, BOARD_WIDTH
                );
            }

            renderingContext.strokeStyle = SHADOW_COLOR;
            renderingContext.lineWidth = 4;
            renderingContext.lineJoin = "round";
            renderingContext.strokeRect(
                -(SHELF_WIDTH / 2) + BOARD_WIDTH, (SHELF_HEIGHT / 2) - CABINET_HEIGHT + (BOARD_WIDTH * 2),
                SHELF_WIDTH - (BOARD_WIDTH * 2), LEVEL_HEIGHT
            );

            renderingContext.beginPath();
            renderingContext.moveTo(0, (SHELF_HEIGHT / 2) - CABINET_HEIGHT + (BOARD_WIDTH * 2));
            renderingContext.lineTo(0, (SHELF_HEIGHT / 2) - BOARD_WIDTH);
            renderingContext.stroke();
        };

        let drawShelf = (renderingContext) => {
            renderingContext.save();
            drawBase(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawShelf };
    })();
})();
