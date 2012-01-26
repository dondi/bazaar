/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
var KeyframeTweener = {
    // The module comes with a library of common easing functions.
    linear: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete + start;
    },

    quadEaseIn: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut = function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut = function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
            (distance / 2) * percentComplete * percentComplete + start :
            (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - sprites: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          it to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    //
    // Initialization primarily calls setInterval on a custom-built
    // frame-drawing (and updating) function.
    initialize: function (settings) {
        // We need to keep track of the current frame.
        var currentFrame = 0,
            sprites = settings.sprites;

        setInterval(function () {
            // For every sprite, determine where we are in the animation,
            // calculate the correct transform, then draw the sprite.

            // Move to the next frame.
            currentFrame += 1;
        }, 1000 / (settings.frameRate || 24));
    }
};
