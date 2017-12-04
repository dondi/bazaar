/*
  A sample jQuery plug-in: this one converts the selected elements to become
  "editable in place"---clicking on the element overlays an input element over
  it and allows the user to change that element's text.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever an in-place editor has been invoked then dismissed.
*/
(($) => {
    // Private plugin constants and helpers.
    const INPUT_MARGIN_TOP = 3;
    const INPUT_MARGIN_LEFT = 3;
    const INPUT_HEIGHT_PADDING = 6;

    const $overlay = $("<div></div>").addClass("editor-overlay");

    $.fn.inPlaceEditor = function (options) {
        let $this = this;
        $this.addClass("in-place-editor").hover(
            event => $(event.currentTarget).append($("<span></span>").addClass("in-place glyphicon glyphicon-edit")),
            event => $(event.currentTarget).find("span.in-place.glyphicon.glyphicon-edit").remove()
        ).click(event => {
            const $receiver = $(event.currentTarget);
            const receiverOffset = $receiver.offset();

            // Note: This plugin handles one-line entry fields only.  Support
            //       for textarea would be nice.
            const $input = $("<input>")
                .val($receiver.text())
                .blur(event => {
                    const $thisInput = $(event.currentTarget);

                    // Transfer the new text over.
                    $receiver.text($thisInput.val());

                    // Clean up.
                    $thisInput.remove();
                    $overlay.detach();

                    // Invoke the callback.
                    if ($.isFunction(options.change)) {
                        options.change.call($receiver[0]);
                    }
                })
                // Mimic the source as much as possible.
                .css({
                    fontSize: $receiver.css('font-size'),
                    fontStyle: $receiver.css('font-style'),
                    fontWeight: $receiver.css('font-weight'),
                    lineHeight: $receiver.css('line-height')
                })

                // The tricky part---slapping an input element EXACTLY over the receiver.
                // Potentially fragile...
                .offset({
                    top: receiverOffset.top - INPUT_MARGIN_TOP - $(window).scrollTop(),
                    left: receiverOffset.left - INPUT_MARGIN_LEFT
                })
                .width($receiver.width())
                .height($receiver.height() + INPUT_HEIGHT_PADDING);

            $("body").append($overlay);
            $overlay.append($input);
            $input.focus().select();
        });

        return $this;
    };

})(jQuery);
