$(() => {
    let $log = $(".event-log");
    let logEvent = (message) => {
        $log.text($log.text() + message + "\n")
            .scrollTop($log[0].scrollHeight - $log.height());
    };

    $(".edit-in-place").inPlaceEditor({
        change: function () {
            logEvent("In-place editor: " + $(this).text());
        }
    });

    $("#demo-select").dropdownSelect({
        initial: "Catch the",

        options: [
            "Catch the",
            "tiger",
            "by the",
            $.fn.dropdownSelect.DIVIDER,
            "toe"
        ],

        change: function (oldSelection, newSelection) {
            logEvent("Dropdown select: Changed from '" + oldSelection + "' to '" + newSelection + "'");
        }
    });

    $(".swivel-this").swivel({
        change: function (oldAngle, newAngle) {
            logEvent("Swivel: Swiveled from " + oldAngle + " to " + newAngle);
        }
    });
});
