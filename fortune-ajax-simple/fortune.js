(() => {
    $("#getFortuneButton").click(() => {
        // Hide the fortune area.
        $("#fortune").hide();

        // Show the feedback message.
        $("#loadingFeedbackElement").show();

        // Make the connection.
        $.get("http://javascript.cs.lmu.edu/php/fortune.php").done(data => {
            // Note that #fortune is still invisible here.
            $("#fortune").text(data);

            // Now we update everything.
            $("#fortune").show();
            $("#loadingFeedbackElement").hide();
        });
    });

    // Hide our output elements for now.
    $("#loadingFeedbackElement, #fortune").hide();
})();
