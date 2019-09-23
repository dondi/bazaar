const apiHost = () => { } // No-op in our mock version.

const searchGifs = () => Promise.resolve({
  data: [
    {
      id: '26BRBupa6nRXMGBP2',
      source_tld: '',
      images: {
        fixed_width: {
          url: 'https://media2.giphy.com/media/26BRBupa6nRXMGBP2/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
        }
      }
    },
    {
      id: 'hklv9aNS7Gcda',
      source_tld: '',
      images: {
        fixed_width: {
          url: 'https://media2.giphy.com/media/hklv9aNS7Gcda/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
        }
      }
    },
    {
      id: 'YJBNjrvG5Ctmo',
      source_tld: '',
      images: {
        fixed_width: {
          url: 'https://media0.giphy.com/media/YJBNjrvG5Ctmo/200w.gif?cid=e1bb72ff5ba9df1d5249616f457f56c5'
        }
      }
    }
  ]
})

export {
  apiHost,
  searchGifs
}
