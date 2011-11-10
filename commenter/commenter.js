// Standard way to get things started with a page that uses
// jQuery.
$(function () {

    // Immediately access a fortune.
    $.ajax({
        url: "http://javascript.cs.lmu.edu/php/fortune.php",
        success: function (data) {
            $("#fortune").text(data);
        }
    });

    // Set up the Comment button.
    $("#comment-button").click(function () {
        $("<p></p>")
            // Danger!  Possible code injection...
            .text($("#current-comment").val())
            .prependTo($("#comment-area"));
    });
});
