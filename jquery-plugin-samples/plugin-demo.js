$(function () {
    $(".edit-in-place").inPlaceEditor({
        change: function () {
            console.log($(this).text());
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
            console.log("Changed from " + oldSelection + " to " + newSelection);
        }
    });
});
