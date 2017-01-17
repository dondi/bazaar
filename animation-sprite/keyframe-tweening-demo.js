/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(() => {
    // We assume that our sample sprite library and keyframe tweener object are available.
    // We download our scene then render it when it's in. For larger scenes, you might want
    // to stick in a "loading" animation while the JSON file is being downloaded.

    // Mainly, it needs to know the rendering context to use.  And the animations to display,
    // of course.
    $.getJSON("scene.json").then((scene) => {
        let canvas = $("#canvas")[0];
        KeyframeTweener.initialize({
            renderingContext: canvas.getContext("2d"),
            width: canvas.width,
            height: canvas.height,
            scene: scene
        });
    });
})();
