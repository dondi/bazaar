/*
 * When the Get button is clicked, this script retrieves
 * the screenname supplied by the user and queries the
 * Twitter web service for that user's last five tweets.
 */
$(function () {
    // All of the action takes place when the Get button is clicked.
    $("#get-button").click(function () {
        // Clear out any prior tweets.
        $("#tweet-container").empty();

        // Access Twitter's user_timeline service.
        $.ajax({
            url: "http://api.twitter.com/1/statuses/user_timeline.json",

            // Parameters are documented in:
            //   https://dev.twitter.com/docs/api/1/get/statuses/user_timeline
            data: {
                screen_name: $("#screenname").val(),
                count: 5
            },

            dataType: "jsonp",

            // The data argument holds the array of tweets returned
            // by the user_timeline service.
            success: function (data) {
                // Place the tweets in a ul.
                var unorderedList = $("<ul></ul>");
                $.each(data, function (index, tweet) {
                    $("<li></li>")
                        .text(tweet.text)
                        .appendTo(unorderedList);
                    /*
                    
                    The code above is closer to jQuery "style:"
                    no need for an additional variable, and use
                    of "chaining" (i.e., multiple function calls
                    on the same object).
                    
                    The code below accomplishes the same thing
                    and is perhaps more expository, but does not
                    match the style as closely.

                    var listItem = $("<li></li>");
                    listItem.text(tweet.text);
                    unorderedList.append(listItem);

                    */
                });

                // Add the list to the tweet container element.
                $("#tweet-container").append(unorderedList);
            }
        });
    });
});
