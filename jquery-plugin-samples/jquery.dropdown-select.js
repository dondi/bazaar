/*
  A sample jQuery plug-in: this one implements an approximate HTML select
  element workalike using Bootstrap's dropdown button classes.

  This plugin's options object can include:

    initial: String
    - The initial display in the dropdown.

    options: [ ]
    - The array of options for the dropdown.

    change: function (oldSelection, newSelection) { }
    - Callback for whenever the current selection has changed.
*/
(function ($) {
    // Private plugin helpers.
    var DIVIDER = '-----',

        // Note: This plug-in depends on Bootstrap JavaScript functionality.
        //       For some assignments/exercises, you will not be allowed to
        //       make use of this, in which case the main purpose of this
        //       sample code is for jQuery plug-in functionality only.
        $mainTemplate = $('<button class="btn dropdown-toggle" data-toggle="dropdown">' +
          '<span></span> ' +
          '<span class="caret"></span>' +
        '</button>'),

        $dropdownTemplate = $('<ul class="dropdown-menu"></ul>'),
        $itemTemplate = $('<li><a></a></li>'),
        $dividerTemplate = $('<li class="divider"></li>');

    $.fn.dropdownSelect = function (options) {
        var $this = this.empty(),
            $main = $mainTemplate.clone(),
            $dropdown = $dropdownTemplate.clone(),
            $selection = $main.find("span:first-child");

        $selection.text(options.initial);
        options.options.forEach(function (option) {
            var $item = (option === DIVIDER ? $dividerTemplate : $itemTemplate).clone();
            if (option !== DIVIDER) {
                $item.find("a").text(option);
                $item.click(function () {
                    var $this = $(this),
                        oldSelection = $selection.text(),
                        newSelection = $this.find("a").text();

                    $selection.text(newSelection);

                    // Invoke the callback.
                    if ($.isFunction(options.change)) {
                        options.change.call($this, oldSelection, newSelection);
                    }
                });
            }
            $dropdown.append($item);
        });

        $this.addClass("btn-group")
            .append($main)
            .append($dropdown);
    };

    $.fn.dropdownSelect.DIVIDER = DIVIDER;
}(jQuery));
