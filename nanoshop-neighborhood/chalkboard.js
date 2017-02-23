// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.Chalkboard = (() => {
        const BOARD_WIDTH = 90;
        const BOARD_HEIGHT = 120;
        const BORDER_WIDTH = 5;
        const MARGIN_LEFT = -30;

        const MAIN_COLOR = "#3B464B";
        const BORDER_COLOR = "#AC8054";
        const FONT_COLOR = "#DDCCCC";

        const MENU_A = [
            "muffins", "coffee, juice, and tea",
            "donuts and assorted pastries", "breakfast special",
            "probably a burrito"
        ];

        const MENU_B = [
            "lunch special", "sandwiches and paninis",
            "tasty soup hell yea", "soup in a bread bowl",
            "personal sized pizza", "salad (caesar or house)"
        ];

        let drawBase = (renderingContext, options) => {
            renderingContext.fillStyle = MAIN_COLOR;
            renderingContext.fillRect(-(BOARD_WIDTH / 2), -(BOARD_HEIGHT / 2), BOARD_WIDTH, BOARD_HEIGHT);
            renderingContext.strokeStyle = BORDER_COLOR;
            renderingContext.lineJoin = "round";
            renderingContext.lineWidth = BORDER_WIDTH;
            renderingContext.strokeRect(-(BOARD_WIDTH / 2), -(BOARD_HEIGHT / 2), BOARD_WIDTH, BOARD_HEIGHT);

            let menuItems = (options.variation !== "B") ? MENU_A : MENU_B;

            renderingContext.strokeStyle = FONT_COLOR;
            renderingContext.lineWidth = 1;
            renderingContext.font = "18px serif";
            renderingContext.strokeText("menu", -25, -35);
            renderingContext.font = "5px serif";
            for (let i = 0; i < menuItems.length; i += 1) {
                renderingContext.strokeText(menuItems[i], MARGIN_LEFT, -10 + (i * 10));
            }
        };

        let drawChalkboard = (renderingContext, options) => {
            renderingContext.save();
            drawBase(renderingContext, options);
            renderingContext.restore();
        };

        return { draw: drawChalkboard };
    })();
})();
