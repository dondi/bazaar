/*
 * This script accesses the JavaScript LMU calendar
 * service and lists the events for a particular date.
 */
$(function () {
    // Set up the date picker.
    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd',

        onSelect: function (dateText, inst) {
            connectToCalendar(dateText.replace(/-/g, ""));
        }
    });

    // Make the connection.
    var connectToCalendar = function (datetext) {
        $.ajax({
            url: "http://javascript.cs.lmu.edu/php/calendar.php?date=" + datetext,
            success: function (data) {
                // We expect data to be a list of events for the
                // date that we requested.  We will display each
                // event in that list on the web page.
                //
                // If the list is empty, we show a different message.

                // Grab the element that will hold the events.
                var eventContainer = $("#retrieved-events");
                
                // Delete everything that used to be in the event container.
                eventContainer.empty();

                if (data.length) {
                    $.each(data, function (indexInArray, valueOfElement) {
                        // Add the month and year as a heading.
                        $("<h1></h1>")
                            .text(valueOfElement.month + " " + valueOfElement.day)
                            .appendTo(eventContainer);

                        // Add the description after the heading.
                        $("<p></p>")
                            .text(valueOfElement.description)
                            .appendTo(eventContainer);

                        // If an event's date cannot change, indicate that.
                        if (!valueOfElement.movable) {
                            $("<p></p>")
                                .text("This event's date cannot change from year to year.")
                                .appendTo(eventContainer);
                        }
                    });
                } else {
                    eventContainer.append($("<p></p>")
                        .text("No events were found for that date."));
                }
            }
        });
    };

});
