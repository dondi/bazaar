/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript ES6 syntax.
*/
$(() => {
    // All of the action takes place when the search button is clicked.
    $("#search-button").click(() => {
        // The getJSON function initiates a connection to the web service.
        $.getJSON("http://api.giphy.com/v1/gifs/search", {
            rating: "pg-13", // Exercise: Hook this up to the front end.
            q: $("#search-term").val(),
            api_key: "dc6zaTOxFJmzC" // Giphy's public beta key (thank you Giphy).
        }).done((result) => {
            // Receiving the response renders it in an HTML element tree then
            // appends it to the element(s) with the class image-result-container.
            $(".image-result-container").empty().append(
                result.data.map((image) => {
                    return $("<div></div>").addClass("col-xs-2").append(
                        $("<img/>").attr({
                            src: image.images.fixed_width.url,
                            alt: image.source_tld
                        })
                    );
                })
            );
        });
    });
});
