(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    // This sample "sprite" library is a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a renderingContext.
    SampleSpriteLibrary.square = (renderingContext) => {
        renderingContext.fillStyle = "blue";
        renderingContext.fillRect(-20, -20, 40, 40);
    };

    SampleSpriteLibrary.circle = (renderingContext) => {
        renderingContext.strokeStyle = "red";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
        renderingContext.stroke();
    };
})();
