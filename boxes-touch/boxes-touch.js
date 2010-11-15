var BoxesTouch = {
    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                element.addEventListener("touchend", BoxesTouch.endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
    },

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        // Don't bother if we aren't tracking anything.
        if (event.currentTarget.movingBox) {
            $.each(event.touches, function (index, touch) {
                // Reposition the object.
                event.currentTarget.movingBox.offset({
                    left: touch.pageX - event.currentTarget.deltaX,
                    top: touch.pageY - event.currentTarget.deltaY
                });
            });
        }
        
        // Don't do any touch scrolling.
        event.preventDefault();
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        if (event.currentTarget.movingBox) {
            // Perform the actual move.
            this.moveTarget
                .width(this.movingBox.width())
                .height(this.movingBox.height())
                .offset(this.movingBox.offset());
            
            // Remove the temporary box from the page and drawing area.
            this.movingBox.remove();
            this.movingBox = null;
        }
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        $.each(event.touches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset(),

                // Grab the drawing area (this element's parent).
                // We want the actual element, and not the jQuery wrapper
                // that usually comes with it.
                parent = jThis.parent().get(0),

                // Feedback: create a temporary box during the move.
                // This is the actual box that moves, until the end.
                movingBox = $("<div></div>")
                    .appendTo(parent)
                    .addClass("box-transient")
                    .width(jThis.width())
                    .height(jThis.height())
                    .offset(jThis.offset());

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            parent.moveTarget = jThis;
            parent.deltaX = touch.pageX - startOffset.left;
            parent.deltaY = touch.pageY - startOffset.top;
            parent.movingBox = movingBox;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    }

};
