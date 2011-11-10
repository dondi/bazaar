// Standard way to get things started with a page that uses
// jQuery.
$(function () {

    // I want to talk to the Post button.
    $("#post-button").click(function () {

        // When the Post button is clicked, I want to grab
        // a fortune.
        $.ajax({
            url: "http://javascript.cs.lmu.edu/php/fortune.php",
            success: function (data) {
                $("#fortune").text(data);
            }
        });

    });

    // When the status field changes, I want to:
    //   (a) report the number of characters
    //   (b) enable/disable the Post button
    $("#status-field").bind("input", function () {

        var statusFieldLength = $("#status-field").val().length;

        // Check whether the Post button should be enabled.
        // It should be enabled if the status field contains
        // 1 to 140 characters.
        if ((statusFieldLength > 0) && (statusFieldLength <= 140)) {
            // Enable the Post button.
            $("#post-button").removeAttr("disabled");
        } else {
            // Disable the Post button.
            $("#post-button").attr("disabled", "disabled");
        }

        // Updates the status countdown.
        if (statusFieldLength === 0) {
            $("#countdown").text("zero");
        } else {
            $("#countdown").text(statusFieldLength);
        }

        // If there is only one character, we want to ditch
        // the "s" in "characters."
        if (statusFieldLength === 1) {
            $("#plural").hide();
        } else {
            $("#plural").show();
        }
    });

});
