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
(($) => {
    // Private plugin helpers.
    const DIVIDER = '-----';

    // Note: This plug-in depends on Bootstrap JavaScript functionality.
    //       For some assignments/exercises, you will not be allowed to
    //       make use of this, in which case the main purpose of this sample
    //       code is for demonstrating jQuery plug-in functionality only.
    let $mainTemplate = $('<button type="button" ' +
            'class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
          '<span></span> ' +
          '<span class="caret"></span>' +
        '</button>');

    let $dropdownTemplate = $('<ul class="dropdown-menu" role="menu"></ul>');
    let $itemTemplate = $('<li><a></a></li>');
    let $dividerTemplate = $('<li class="divider"></li>');

    $.fn.dropdownSelect = function (options) {
        let $this = this.empty();
        let $main = $mainTemplate.clone();
        let $dropdown = $dropdownTemplate.clone();
        let $selection = $main.find("span:first-child");

        $selection.text(options.initial);
        options.options.forEach((option) => {
            let $item = (option === DIVIDER ? $dividerTemplate : $itemTemplate).clone();
            if (option !== DIVIDER) {
                $item.find("a").text(option);
                $item.click((event) => {
                    let $this = $(event.currentTarget);
                    let oldSelection = $selection.text();
                    let newSelection = $this.find("a").text();

                    $selection.text(newSelection);

                    // Invoke the callback. We want jQuery-like behavior that binds `this` to the component
                    // that change, so we use `call` instead of plain parentheses.
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

        return $this;
    };

    $.fn.dropdownSelect.DIVIDER = DIVIDER;
})(jQuery);
