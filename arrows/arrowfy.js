/*
 * A sample jQuery plugin that converts divs into arrows.
 *
 * As a jQuery plugin, you will need to load up the jQuery
 * JavaScript Library first for this code to work.
 *
 * The "money part" (or should we say "the $ part") is
 * the inner function.  The lines before and the lines after
 * are general boilerplate for any jQuery plugin.
 *
 * Note how this code still relies on the original
 * arrows.css file.  While we *could* obviate the need
 * for arrows.css by setting the CSS properties in code,
 * this unnecessarily un-separates our concerns, and makes
 * it harder to tweak the shared look of our arrows.
 */
(function ($) {
    $.fn.arrowfy = function () {
        // Inside the plugin, "this" corresponds to the
        // elements selected by jQuery whenever the
        // plugin (arrowfy in this case) is invoked.

        // Create the arrowhead divs and add them at the
        // beginning of the selected element (thus the
        // use of prepend; to add to the end, use append).
        this.prepend("<div></div>").prepend("<div></div>");
 
        // Set the CSS for the main arrow div.
        this.addClass("arrow");
    };
})(jQuery);
//Fall 2014 begins
