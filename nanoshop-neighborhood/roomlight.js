// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.RoomLight = (() => {
        const SHADE_HOLD_WIDTH = 50;
        const SHADE_HOLD_HEIGHT = 15;
        const SHADE_RADIUS = 50;
        const LIGHT_RADIUS = 400;
        const ROD_LENGTH = 120;
        const ROD_WIDTH = 8;
        const DEFAULT_BRIGHTNESS = 0;

        const BASE_COLOR = "#404035";
        const LIGHT_COLOR_RGB = "250, 240, 150";
        const TRANSPARENT = "rgba(255, 255, 255, 0)";

        let drawLight = (renderingContext, options) => {
            let brightness = +(options.brightness || DEFAULT_BRIGHTNESS);

            let radialGradient = renderingContext.createRadialGradient(
                0, SHADE_RADIUS, 1,
                0, SHADE_RADIUS, LIGHT_RADIUS
            );

            radialGradient.addColorStop(0, "rgba(" + LIGHT_COLOR_RGB + "," + brightness + ")");
            radialGradient.addColorStop(1, TRANSPARENT);

            renderingContext.fillStyle = radialGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.arc(0, LIGHT_RADIUS, LIGHT_RADIUS, 0, Math.PI, false);
            renderingContext.fill();
        };

        let drawShade = (renderingContext) => {
            renderingContext.fillStyle = BASE_COLOR;
            renderingContext.strokeStyle = BASE_COLOR;

            renderingContext.fillRect(
                -(SHADE_HOLD_WIDTH / 2), -(SHADE_HOLD_HEIGHT / 2),
                SHADE_HOLD_WIDTH, SHADE_HOLD_HEIGHT
            );

            renderingContext.beginPath();
            renderingContext.arc(0, SHADE_RADIUS, SHADE_RADIUS, 0, Math.PI, true);
            renderingContext.fill();

            renderingContext.lineWidth = ROD_WIDTH;
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.lineTo(0, -ROD_LENGTH);
            renderingContext.closePath();
            renderingContext.stroke();
        };

        let drawRoomLight = (renderingContext, options) => {
            renderingContext.save();
            drawLight(renderingContext, options);
            drawShade(renderingContext);
            renderingContext.restore();
        };

        return { draw: drawRoomLight };
    })();
})();
