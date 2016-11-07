(($) => {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    let trackDrag = (event) => {
        $.each(event.changedTouches, (index, touch) => {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    let endDrag = (event) => {
        $.each(event.changedTouches, (index, touch) => {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    let unhighlight = (event) => $(event.currentTarget).removeClass("box-highlight");

    /**
     * Begins a box move sequence.
     */
    let startMove = (event) => {
        $.each(event.changedTouches, (index, touch) => {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            let jThis = $(touch.target);
            let startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    let setDrawingArea = (jQueryElements) => {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each((index, element) => {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })

            .find("div.box").each((index, element) => {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
            });
    };

    // No arrow function here because we don't want lexical scoping.
    $.fn.boxesTouch = function () {
        setDrawingArea(this);
        return this;
    };
})(jQuery);
