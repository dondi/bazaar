/*
 * This script accesses the JavaScript LMU calendar
 * service and lists the events for a particular date.
 */
$(function () {

    // Make the connection.
    $.ajax({
        url: "http://javascript.cs.lmu.edu/php/calendar.php?date=20110606",
        success: function (data) {
            // We expect data to be a list of events for the
            // date that we requested.  We will display each
            // event in that list on the web page.
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
        }
    });

});
