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
            url: "https://api.twitter.com/1.1/statuses/user_timeline.json",

            // Parameters are documented in:
            //   https://dev.twitter.com/rest/reference/get/statuses/user_timeline
            data: {
                screen_name: $("#screenname").val(),
                count: 5
            },

            // Since this sample was last written, access to the Twitter API was significantly
            // revised to use OAuth. Thus, this sample will not run as-is (what you see below is
            // solely a sample and will be invalid by the time you see this). Please consult
            // https://dev.twitter.com/oauth/overview for details.
            headers: {
                Authorization: 'Authorization: OAuth oauth_consumer_key="FfHxOmrpA48oxYS14qjY52WJf", oauth_nonce="a1b9ce5fe4c91e3343073f6da1493e4e", oauth_signature="mNUncBqTFOZS4d2OtSLl1EeOpDA%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1475384122", oauth_version="1.0"'
            },

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
