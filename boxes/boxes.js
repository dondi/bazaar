var Boxes = {
    /**
     * Constant for the left mouse button.
     */
    LEFT_BUTTON: 1,

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        jQueryElements
            .addClass("drawing-area")
            // "this" is Boxes.
            .mousedown(this.startDraw)
            .mousemove(this.rubberbandCurrent)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(this.endDraw)
            .mouseleave(this.endDraw);
    },

    /**
     * Begins a box draw sequence.
     */
    startDraw: function (event) {
        // We only respond to the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            // Add a new box to the drawing area.  Note how we use
            // the drawing area as a holder of "local" variables
            // ("this" as standardized by jQuery).
            this.anchorX = event.pageX;
            this.anchorY = event.pageY;
            this.current = $("<div></div>")
                .appendTo(event.currentTarget)
                .addClass("box")
                .offset({ left: this.anchorX, top: this.anchorY });
        }
    },

    /**
     * Tracks a box as it is rubberbanded across the drawing area.
     */
    rubberbandCurrent: function (event) {
        // Don't bother if we aren't tracking anything.
        if (this.current) {
            // Calculate the new box location and dimensions.  Note how
            // this might require a "corner switch."
            var newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };

            this.current
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));
        }
    },

    /**
     * Concludes a drawing sequence.
     */
    endDraw: function (event) {
        if (this.current) {
            // Finalize things by setting the box's behavior.
            this.current
                .mouseover(Boxes.highlight)
                .mousemove(Boxes.highlight)
                .mouseleave(Boxes.unhighlight)
                .mousedown(Boxes.startMove);
            
            // All done.
            this.current = null;
        }
    },

    /**
     * Indicates that an element is highlighted.
     */
    highlight: function () {
        $(this).addClass("box-highlight");
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
        // We only move using the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            // Take note of the box's current (global) location.
            var jThis = $(this),
                startOffset = jThis.offset();

            // Feedback: create a temporary box during the move.
            // This is the actual box that moves, until the end.
            $("<div></div>")
                // Record some state information about the move.
                .data("targetBox", jThis)
                .data("deltaX", event.pageX - startOffset.left)
                .data("deltaY", event.pageY - startOffset.top)
                .appendTo(jThis.parent())
                .addClass("box-transient")
                .width(jThis.width())
                .height(jThis.height())
                .offset(jThis.offset())
                .mousemove(Boxes.move)
                .mouseup(Boxes.endMove)
                .mouseleave(Boxes.endMove);

            // Move this obje
            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }
    },

    /**
     * "Tracks" an on-going move sequence.
     */
    move: function (event) {
        // Reposition the object.
        var jThis = $(this);
        jThis.offset({
            left: event.pageX - jThis.data("deltaX"),
            top: event.pageY - jThis.data("deltaY")
        });
    },

    /**
     * Ends a move sequence via mouse up.
     */
    endMove: function (event) {
        // Perform the actual move.
        var jThis = $(this);
        jThis.data("targetBox")
            .width(jThis.width())
            .height(jThis.height())
            .offset(jThis.offset());
        
        // Remove the target from the page.
        jThis.remove();
    }

};
