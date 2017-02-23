// Graphics by Angela Elgar: https://github.com/aelgar
(() => {
    window.Sprites = window.Sprites || { };
    window.Sprites.Cup = (() => {
        const CUP_HEIGHT = 120;
        const CUP_WIDTH = 200;
        const HANDLE_THICKNESS = 15;
        const STEAM_HEIGHT = 60;
        const STEAM_THICKNESS = HANDLE_THICKNESS / 2;
        const STEAM_Y_OFFSET = -(CUP_HEIGHT * 0.75);

        const DEFAULT_COLOR = "SteelBlue";
        const DEFAULT_STEAM_RGB = "170, 220, 230";
        const DEFAULT_STEAM_OPACITY = 0;

        const HANDLE_CURVE = {
            ctrlPt1: { x: CUP_WIDTH, y: CUP_HEIGHT * -0.8 },
            ctrlPt2: { x: CUP_WIDTH * 0.8, y: CUP_HEIGHT * 0.7 },
            endPt: { x: 0, y: CUP_HEIGHT * 0.2 }
        };

        const STEAM_CURVE = {
            ctrlPt1: { x: -20, y: STEAM_Y_OFFSET - (STEAM_HEIGHT / 2) },
            ctrlPt2: { x: 20, y: STEAM_Y_OFFSET - STEAM_HEIGHT - (STEAM_HEIGHT / 2) }
        };

        let drawBase = (renderingContext) => {
            renderingContext.beginPath();
            renderingContext.moveTo(-(CUP_WIDTH / 2), -(CUP_HEIGHT / 2));
            renderingContext.lineTo(CUP_WIDTH / 2, -(CUP_HEIGHT / 2));
            renderingContext.quadraticCurveTo(CUP_WIDTH / 2, CUP_HEIGHT / 2, 0, CUP_HEIGHT / 2);
            renderingContext.quadraticCurveTo(-(CUP_WIDTH / 2), CUP_HEIGHT / 2, -(CUP_WIDTH / 2), -(CUP_HEIGHT / 2));
            renderingContext.fill();
        };

        let drawHandle = (renderingContext) => {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.bezierCurveTo(
                HANDLE_CURVE.ctrlPt1.x, HANDLE_CURVE.ctrlPt1.y,
                HANDLE_CURVE.ctrlPt2.x, HANDLE_CURVE.ctrlPt2.y,
                HANDLE_CURVE.endPt.x, HANDLE_CURVE.endPt.y
            );
            renderingContext.lineWidth = HANDLE_THICKNESS;
            renderingContext.stroke();
            renderingContext.closePath();
            renderingContext.restore();
        };

        let drawSteamCurve = (renderingContext, xOffset, yOffset) => {
            renderingContext.beginPath();
            renderingContext.moveTo(xOffset, STEAM_Y_OFFSET + yOffset);
            renderingContext.quadraticCurveTo(
                STEAM_CURVE.ctrlPt1.x + xOffset, STEAM_CURVE.ctrlPt1.y + yOffset,
                xOffset, STEAM_Y_OFFSET - STEAM_HEIGHT + yOffset
            );
            renderingContext.quadraticCurveTo(
                STEAM_CURVE.ctrlPt2.x + xOffset, STEAM_CURVE.ctrlPt2.y + yOffset,
                xOffset, STEAM_Y_OFFSET - STEAM_HEIGHT * 2 + yOffset
            );
            renderingContext.stroke();
            renderingContext.closePath();
        };

        let drawSteamSet = (renderingContext, options) => {
            let opacity = options.steamOpacity || DEFAULT_STEAM_OPACITY;
            renderingContext.save();
            renderingContext.strokeStyle = "rgba(" + DEFAULT_STEAM_RGB + "," + opacity + ")";
            renderingContext.lineWidth = STEAM_THICKNESS;
            renderingContext.lineCap = "round";
            drawSteamCurve(renderingContext, 0, -10);
            drawSteamCurve(renderingContext, -50, +10);
            drawSteamCurve(renderingContext, 50, +10);
            renderingContext.restore();
        };

        let drawCup = (renderingContext, options) => {
            renderingContext.save();

            let color = options.color || DEFAULT_COLOR;
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
