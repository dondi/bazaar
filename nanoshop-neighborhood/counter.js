// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.Counter = (() => {
        const COUNTER_HEIGHT = 120;
        const COUNTER_WIDTH = 400;
        const COUNTER_TOP_WIDTH = 16;
        const MAIN_COLOR = "#57442A";
        const SHADOW_COLOR = "#47341A";

        let drawBase = (renderingContext) => {
            renderingContext.fillStyle = MAIN_COLOR;
            renderingContext.fillRect(
                -(COUNTER_WIDTH / 2), -(COUNTER_HEIGHT / 2),
                COUNTER_WIDTH, COUNTER_HEIGHT
            );

            renderingContext.fillStyle = SHADOW_COLOR;
            renderingContext.fillRect(
                -(COUNTER_WIDTH / 2), -(COUNTER_HEIGHT / 2),
                COUNTER_WIDTH, COUNTER_HEIGHT / 6
            );

            renderingContext.strokeStyle = MAIN_COLOR;
            renderingContext.lineWidth = COUNTER_TOP_WIDTH;
            renderingContext.lineCap = "square";

            renderingContext.beginPath();
            renderingContext.moveTo(-(COUNTER_WIDTH / 2), -(COUNTER_HEIGHT / 2));
            renderingContext.lineTo(COUNTER_WIDTH / 2, -(COUNTER_HEIGHT / 2));
            renderingContext.stroke();
        };

        let drawCounter = (renderingContext) => {
            renderingContext.save();
            drawBase(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawCounter };
    })();
})();
