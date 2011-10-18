$(function () {

    $("#getFortuneButton").click(function () {
        // Hide the fortune area.
        $("#fortune").hide();

        // Show the feedback message.
        $("#loadingFeedbackElement").show("slow");

        // Make the connection.
        $.ajax({
            url: "http://javascript.cs.lmu.edu/php/fortune.php",
            success: function (data) {
                // Note that #fortune is still invisible here.
                $("#fortune").text(data);

                // Now we update everything.
                $("#fortune").fadeIn();
                $("#loadingFeedbackElement").hide("slow");
            }
        });
    });

    // Hide our output elements for now.
    $("#loadingFeedbackElement, #fortune").hide();

});
