// When starting a front end, it is usual to first separate out the functions which will be implemented by
// a web service. This module demonstrates how such a “mock” service can look. Note how the external interface
// of the final ApiService object matches the one in api.js. That’s because, in reality, this file is actually
// how api.js _starts_, and it morphs into the final api.js when you connect to the web service for real.
(() => {
  const searchGifs = () => Promise.resolve({
    data: [
      {
        source_tld: '',
        images: {
          fixed_width: {
            url: 'https://media2.giphy.com/media/26BRBupa6nRXMGBP2/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
          }
        }
      },
      {
        source_tld: '',
        images: {
          fixed_width: {
            url: 'https://media2.giphy.com/media/hklv9aNS7Gcda/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
          }
        }
      },
      {
        source_tld: '',
        images: {
          fixed_width: {
            url: 'https://media0.giphy.com/media/YJBNjrvG5Ctmo/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
          }
        }
      }
    ]
  })

  window.ApiService = {
    apiHost: () => {}, // No-op in our mock version.
    searchGifs
  }
})()
