(function ($) {
    /**
     * Constant for the left mouse button.
     */
    var LEFT_BUTTON = 1;

    /**
     * Utility function for disabling certain behaviors when the drawing
     * area is in certain states.
     */
    var setupDragState = function () {
        $(".drawing-area .box")
            .unbind("mousemove")
            .unbind("mouseleave");
    };

    /**
     * Indicates that an element is highlighted.
     */
    var highlight = function () {
        $(this).addClass("box-highlight");
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box draw sequence.
     */
    var startDraw = function (event) {
        // We only respond to the left mouse button.
        if (event.which === LEFT_BUTTON) {
            // Add a new box to the drawing area.  Note how we use
            // the drawing area as a holder of "local" variables
            // ("this" as standardized by jQuery).
            this.anchorX = event.pageX;
            this.anchorY = event.pageY;
            this.drawingBox = $("<div></div>")
                .appendTo(this)
                .addClass("box")
                .offset({ left: this.anchorX, top: this.anchorY });

            // Take away the highlight behavior while the draw is
            // happening.
            setupDragState();
        }
    };

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        // Don't bother if we aren't tracking anything.
        if (this.drawingBox) {
            // Calculate the new box location and dimensions.  Note how
            // this might require a "corner switch."
            var newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };

            this.drawingBox
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));
        } else if (this.movingBox) {
            // Reposition the object.
            this.movingBox.offset({
                left: event.pageX - this.deltaX,
                top: event.pageY - this.deltaY
            });
        }
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        // We only move using the left mouse button.
        if (event.which === LEFT_BUTTON) {
            // Take note of the box's current (global) location.
            var jThis = $(this),
                startOffset = jThis.offset(),

                // Grab the drawing area (this element's parent).
                // We want the actual element, and not the jQuery wrapper
                // that usually comes with it.
                parent = jThis.parent().get(0);

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            parent.movingBox = jThis;
            parent.deltaX = event.pageX - startOffset.left;
            parent.deltaY = event.pageY - startOffset.top;

            // Take away the highlight behavior while the move is
            // happening.
            setupDragState();

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        if (this.drawingBox) {
            // Finalize things by setting the box's behavior.
            this.drawingBox
                .mousemove(highlight)
                .mouseleave(unhighlight)
                .mousedown(startMove);
            
            // All done.
            this.drawingBox = null;
        } else if (this.movingBox) {
            // Change state to "not-moving-anything" by clearing out
            // this.movingBox.
            this.movingBox = null;
        }

        // In either case, restore the highlight behavior that was
        // temporarily removed while the drag was happening.
        $(".drawing-area .box")
            .removeClass("box-highlight")
            .mousemove(highlight)
            .mouseleave(unhighlight);
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        jQueryElements
            .addClass("drawing-area")
            .mousedown(startDraw)
            .mousemove(trackDrag)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(endDrag)
            .mouseleave(endDrag);
    };

    $.fn.boxes = function () {
        setDrawingArea(this);
    };
}(jQuery));
