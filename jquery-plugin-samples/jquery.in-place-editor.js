/*
  A sample jQuery plug-in: this one converts the selected elements to become
  "editable in place"---clicking on the element overlays an input element over
  it and allows the user to change that element's text.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever an in-place editor has been invoked then dismissed.
*/
(function ($) {
    // Private plugin helpers.
    var $overlay = $("<div></div>")
            .addClass("editor-overlay");

    $.fn.inPlaceEditor = function (options) {
        var $this = this;
        $this.addClass("in-place-editor")
            .hover(
                function (event) {
                    $(this).append($("<span></span>").addClass("in-place glyphicon glyphicon-edit"));
                },

                function (event) {
                    $(this).find("span.in-place.glyphicon.glyphicon-edit").remove();
                }
            )
            .click(function (event) {
                var $receiver = $(this),
                    receiverOffset = $receiver.offset(),
                    // Note: This plugin handles one-line entry fields only.  Support
                    //       for textarea would be nice.
                    $input = $("<input>")
                        .val($receiver.text())
                        .blur(function (event) {
                            var $thisInput = $(this);

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
                            top: receiverOffset.top - 3 - $(window).scrollTop(),
                            left: receiverOffset.left - 3
                        })
                        .width($receiver.width())
                        .height($receiver.height() + 6);

                $("body").append($overlay);
                $overlay.append($input);
                $input.focus().select();
            });
    };

}(jQuery));
