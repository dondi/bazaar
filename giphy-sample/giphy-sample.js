/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript ES6 syntax.
*/
"use strict";

// Yes, this is a "global." But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
window.GiphySearchController = (() => {
    return {
        init: () => {
            var searchButton = $("#search-button");
            var searchTerm = $("#search-term");
            var imageResultContainer = $(".image-result-container");

            searchButton.click(() => {
                // The getJSON function initiates a connection to the web service.
                $.getJSON("http://api.giphy.com/v1/gifs/search", {
                    rating: "pg-13", // Exercise: Hook this up to the front end.
                    q: searchTerm.val(),
                    api_key: "dc6zaTOxFJmzC" // Giphy's public beta key (thank you Giphy).
                }).done((result) => {
                    // Receiving the response renders it in an HTML element tree then
                    // appends it to the element(s) with the class image-result-container.
                    imageResultContainer.empty().append(
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

            searchTerm.bind("input", () => {
                searchButton.prop("disabled", !searchTerm.val());
            });
        }
    };
})();
