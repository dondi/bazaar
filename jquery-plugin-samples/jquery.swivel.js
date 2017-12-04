/*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “swivel” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
(($) => {
    $.fn.swivel = function (options) {
        const $this = this;

        let $current = null;
        let anchorX = 0;

        $this.addClass("swivel").mousedown(function (event) {
            $current = $(this);
            anchorX = event.screenX - ($current.data('swivel-angle') || 0);
        });

        // Other mouse events go at the level of the document because
        // they might leave the element's bounding box.
        $(document).mousemove(event => {
            if ($current) {
                const currentAngle = $current.data('swivel-angle') || 0;
                const newAngle = event.screenX - anchorX;
                const newCss = "perspective(500px) rotateY(" + newAngle + "deg)";

                $current.css({
                    'transform': newCss
                }).data({
                    'swivel-angle': newAngle
                });

                // Invoke the callback. We want jQuery-like behavior that binds `this` to the component
                // that change, so we use `call` instead of plain parentheses.
                if ($.isPlainObject(options) && $.isFunction(options.change)) {
                    options.change.call($current, currentAngle, newAngle);
                }
            }
        }).mouseup(() => {
            $current = null;
        });

        return $this;
    };
})(jQuery);
