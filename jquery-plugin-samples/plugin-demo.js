$(function () {
    $(".edit-in-place").inPlaceEditor({
        change: function () {
            console.log($(this).text());
        }
    });
});
