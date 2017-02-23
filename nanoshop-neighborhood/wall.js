// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.Wall = (() => {
        const WALL_HEIGHT = 400;
        const WALL_WIDTH = 800;

        const STRIPE_COUNT = 9;
        const LINE_THICKNESS = 4;
        const ACCENT_HEIGHT_RATIO = .40;
        const ACCENT_PANEL_WIDTH = 40;

        const BASE_COLOR = "#4C4537";
        const STRIPE_COLOR = "#7B9080";
        const ACCENT_COLOR = "#6A5B47";
        const ACCENT_LINES = "#504030";

        const STRIPE_WIDTH = WALL_WIDTH / STRIPE_COUNT;
        const ACCENT_HEIGHT = WALL_HEIGHT * ACCENT_HEIGHT_RATIO;

        let drawBase = (renderingContext, options) => {
            renderingContext.fillStyle = BASE_COLOR;
            renderingContext.strokeStyle = BASE_COLOR;
            renderingContext.lineWidth = LINE_THICKNESS;
            renderingContext.fillRect(-(WALL_WIDTH / 2), -(WALL_HEIGHT / 2), WALL_WIDTH, WALL_HEIGHT);
            renderingContext.strokeRect(-(WALL_WIDTH / 2), -(WALL_HEIGHT / 2), WALL_WIDTH, WALL_HEIGHT);

            if (options.hasStripes) {
                renderingContext.fillStyle = STRIPE_COLOR;
                for (let i = 0; i < STRIPE_COUNT; i += 2) {
                    renderingContext.fillRect(
                        -(WALL_WIDTH / 2) + STRIPE_WIDTH * i,
                        -(WALL_HEIGHT / 2), STRIPE_WIDTH, WALL_HEIGHT
                    );
                }
            }
        };

        let drawAccent = (renderingContext) => {
            renderingContext.fillStyle = ACCENT_COLOR;
            renderingContext.strokeStyle = ACCENT_LINES;

            renderingContext.fillRect(-(WALL_WIDTH / 2), ((WALL_HEIGHT / 2) - ACCENT_HEIGHT), WALL_WIDTH, ACCENT_HEIGHT);
            renderingContext.strokeRect(-(WALL_WIDTH / 2), ((WALL_HEIGHT / 2) - ACCENT_HEIGHT), WALL_WIDTH, ACCENT_HEIGHT);

            for (let i = 0; i < (WALL_WIDTH / ACCENT_PANEL_WIDTH) / 2 - 1; i += 1) {
                renderingContext.strokeRect(
                    -(WALL_WIDTH / 2) + STRIPE_WIDTH * i, ((WALL_HEIGHT / 2) - ACCENT_HEIGHT),
                    ACCENT_PANEL_WIDTH, ACCENT_HEIGHT
                );
            }

            renderingContext.fillRect(
                -(WALL_WIDTH / 2), (WALL_HEIGHT / 2) - ACCENT_HEIGHT,
                WALL_WIDTH, ACCENT_PANEL_WIDTH / 2
            );

            renderingContext.strokeRect(
                -(WALL_WIDTH / 2), (WALL_HEIGHT / 2) - ACCENT_HEIGHT,
                WALL_WIDTH, ACCENT_PANEL_WIDTH / 2
            );
        };

        let drawWall = function (renderingContext, options) {
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
