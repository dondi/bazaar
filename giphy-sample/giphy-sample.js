$(() => {
    // Registering an event handler upon clicking the search button
    $("#search-button").click(() => {
        // Asynchronous request to giphy api
        $.getJSON("http://api.giphy.com/v1/gifs/search", {
            rating: "pg-13",
            q: $("#search-term").val(),
            api_key: "dc6zaTOxFJmzC"
        }).done((result) => {
            // Displaying the response if the request was successful
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
