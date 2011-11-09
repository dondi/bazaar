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
    $("#status-field").keyup(function () {

        $("#countdown").text($("#status-field").val().length);

    });

});
