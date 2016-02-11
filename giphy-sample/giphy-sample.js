$(function () {

    $("#search-button").click(function () {
        $.getJSON(
            "http://api.giphy.com/v1/gifs/search",

            {
                q: $("#search-term").val(),
                api_key: "dc6zaTOxFJmzC"
            }
        ).done(function (result) {
            $(".image-result-container").empty().append(
                result.data.map(function (image) {
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
