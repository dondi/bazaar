/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(() => {
    // Ditto on using jQuery here.
    let canvas = document.getElementById("canvas");
    let renderingContext = canvas.getContext("2d");

    // Declare other variables here.
    let radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

    // Put your canvas drawing code (and any other code) here.
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, "blue");

    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(256, 256, 200, 0, Math.PI * 2, true);
    renderingContext.fill();
})();
