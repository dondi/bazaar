describe('Giphy search example', () => {
  beforeEach(() => {
    fixture.setBase('test')
    fixture.load('search.fixture.html')
    window.GiphySearchController.init()
  })

  afterEach(() => fixture.cleanup())

  it('should start with an empty search field', () => expect($('#search-term').val()).toBe(''))
  it('should start with a disabled search button', () => expect($('#search-button').prop('disabled')).toBe(true))

  describe('search button', () => {
    let searchTerm
    let searchButton

    beforeEach(() => {
      searchTerm = $('#search-term')
      searchButton = $('#search-button')
    })

    it('should be enabled when the search field is not blank', () => {
      // Programmatic changes to elements do not trigger events on their own, so in unit tests
      // we need to trigger those programmatically as well.
      searchTerm.val('i can haz unit tests').trigger('input')
      expect(searchButton.prop('disabled')).toBe(false)
    })

    it('should be disabled when the search field is blank', () => {
      searchTerm.val('').trigger('input')
      expect(searchButton.prop('disabled')).toBe(true)
    })
  })

  // Due to the asynchronous call structure of GiphySearchController, for certain usages of our stubbed API, we need
  // to wait for the call chain to finish before we can make our assertions. _This approach is fragile_ but cannot
  // be helped given the structure of the code. Ideally, though, we should find a way to get a clear signal for when
  // responses are fully processed so that we aren’t waiting on some arbitrary timeout.
  const FETCH_COMPLETION_DELAY = 250

  describe('API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchGifs')

      // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
      // that we need to revise the mock response if our app starts using more (or different) data.
      window.ApiService.searchGifs.returns(Promise.resolve({
        data: [
          {
            source_tld: 'tumblr.com',
            images: {
              fixed_width: {
                url: 'http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif'
              }
            }
          }
        ]
      }))

      $('#search-term').val('hello')
      $('#search-button').click()
    })

    afterEach(() => window.ApiService.searchGifs.restore())

    it('should trigger a Giphy search when the search button is clicked', () =>
      expect(window.ApiService.searchGifs.firstCall.args[0]).toEqual({
        rating: 'pg-13',
        q: 'hello' // Our test search term.
      })
    )

    it('should populate the image container when search results arrive', done => setTimeout(() => {
      expect($('.image-result-container').children().length).toBe(1)
      // We can go even further by examining the resulting element(s) and expecting their content to match the
      // mock response, but we will leave this as 'further work' for now.

      // Since this happens asynchronously, we have to call the `done` argument to indicate that the test can
      // be concluded.
      done()
    }, FETCH_COMPLETION_DELAY))
  })

  describe('failed API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchGifs')
      window.ApiService.searchGifs.returns(Promise.reject('Mock failure'))

      $('#search-term').val('hello failure')
      $('#search-button').click()
    })

    afterEach(() => window.ApiService.searchGifs.restore())

    it('should display an alert when the API call fails', done => setTimeout(() => {
      // In this test, we have chosen not to a specific message; we’re just making sure that an alert-danger
      // element showed up. Of course, we _may_ choose to expect a particular message, especially if we want
      // it to say something specific to the user.
      expect($('.image-result-container').find('.alert.alert-danger').length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))
  })
})
