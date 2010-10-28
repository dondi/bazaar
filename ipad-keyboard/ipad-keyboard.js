$(function () {
    // Initialize all keys as inactive.
    $("div.key span").addClass("inactive");

    // Set up the event handlers.
    $("div.key span").mousedown(function (event) {
        $(event.currentTarget).removeClass("inactive");
        $(event.currentTarget).addClass("active");
    })

    .mouseup(function (event) {
        $(event.currentTarget).removeClass("active");
        $(event.currentTarget).addClass("inactive");
    });
});
