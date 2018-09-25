/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript 2015 syntax.
*/

// Yes, this is a “global.” But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
(() => {
  const setupEventListeners = () => {
    const searchButton = $('#search-button')
    const searchTerm = $('#search-term')

    searchButton.click(
      () => window.ApiService.searchGifs({
        rating: 'pg-13', // Exercise: Hook this up to the front end.
        q: searchTerm.val(),
        api_key: 'dc6zaTOxFJmzC' // Giphy's public beta key (thank you Giphy).
      }).then(result => displayImages(result.data))
        .catch(() => alert('Sorry, but something went wrong.'))
    )

    searchTerm.bind('input', () => searchButton.prop('disabled', !searchTerm.val()))
  }

  const imageElement = image => $('<div></div>').addClass('col-xs-2').append(
    $('<img/>').attr({
      src: image.images.fixed_width.url,
      alt: image.source_tld
    })
  )

  const displayImages = images => $('.image-result-container').empty().append(
    // Receiving the response renders it in an HTML element tree then appends
    // it to the element(s) with the class image-result-container.
    images.map(imageElement)
  )

  const init = () => {
    window.ApiService.apiHost('http://api.giphy.com/v1/')
    setupEventListeners()
  }

  window.GiphySearchController = {
    init
  }
})()
