/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript 2015 syntax.
*/

// Yes, this is a "global." But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
(() => {
  window.GiphySearchController = {
    init: () => {
      const searchButton = $('#search-button')
      const searchTerm = $('#search-term')
      const imageResultContainer = $('.image-result-container')

      searchButton.click(() =>
        // The fetch function initiates a connection to the web service.
        // fetch returns a _promise_: an object that represents a future result.
        // Thus, the function actually returns right away. However, when the
        // anticipated result does show up, the code specifies what to do using
        // either `then` or `catch`. Both functions accept another function,
        // to be called upon a successful or failed promise, respectively.
        // Furthermore, then `then` function can be chained: its return result
        // is passed to the next `then` function as an argument. Here, the initial
        // handler converts the raw result into JSON. That JSON then goes to the
        // next handler, which does the actual work of putting the result on the
        // web page.
        //
        // The design of fetch allows this entire sequence to be rendered in a
        // _single statement_, thus obviating the need for curly braces but
        // resulting in what many will view to be a decrease in readability
        // (for those who aren’t used to functional-style programming). YMMV
        window.fetch(`http://api.giphy.com/v1/gifs/search?${new URLSearchParams({
          rating: 'pg-13', // Exercise: Hook this up to the front end.
          q: searchTerm.val(),
          api_key: 'dc6zaTOxFJmzC' // Giphy's public beta key (thank you Giphy).
        })}`).then(
          response => response.json()
        ).then(
          result => imageResultContainer.empty().append(
            // Receiving the response renders it in an HTML element tree then appends
            // it to the element(s) with the class image-result-container.
            result.data.map(image => $('<div></div>').addClass('col-xs-2').append(
              $('<img/>').attr({
                src: image.images.fixed_width.url,
                alt: image.source_tld
              })
            ))
          )
        ).catch(() => alert('Sorry, but something went wrong.'))
      )

      searchTerm.bind('input', () => searchButton.prop('disabled', !searchTerm.val()))
    }
  }
})()
