$(function () {

    $("#search-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/search",

            {
                q: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            var img = $("<img/>").attr({
                    src: result.data[0].images.original.url,
                    alt: "search result"
                });

            $("body").append(img);
        });
    });

});
