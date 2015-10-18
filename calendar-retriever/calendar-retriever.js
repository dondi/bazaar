/*
 * This script accesses the JavaScript LMU calendar
 * service and lists the events for a particular date.
 */
$(function () {

    // Make the connection.
    $.getJSON(
        "http://javascript.cs.lmu.edu/php/calendar.php?date=20151001"
    ).done(function (data) {
        // We expect data to be a list of events for the
        // date that we requested.  We will display each
        // event in that list on the web page.
        //
        // If the list is empty, we show a different message.
        if (data.length) {
            $.each(data, function (indexInArray, valueOfElement) {
                // Grab the body of the page.
                var body = $("body");

                // Add the month and year as a heading.
                $("<h1></h1>")
                    .text(valueOfElement.month + " " + valueOfElement.day)
                    .appendTo(body);

                // Add the description after the heading.
                $("<p></p>")
                    .text(valueOfElement.description)
                    .appendTo(body);

                // If an event's date cannot change, indicate that.
                if (!valueOfElement.movable) {
                    $("<p></p>")
                        .text("This event's date cannot change from year to year.")
                        .appendTo(body);
                }
            });
        } else {
            $("body").append($("<p></p>")
                .text("No events were found for that date."));
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("body").append($("<p></p>")
            .text("The program encountered an error. Most likely, this is because the returned JSON parsed badly."));
    });

});
