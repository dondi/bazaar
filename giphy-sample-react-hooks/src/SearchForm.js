import React, { useState } from 'react'

import './SearchForm.css'

import SearchResults from './SearchResults'

import { searchGifs } from './api'

const SearchForm = () => {
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])

  const handleQueryChange = event => setQuery(event.target.value)

  const performQuery = async event => {
    event.preventDefault()

    setError(null)

    try {
      const result = await searchGifs({
        rating: 'pg-13',
        q: query
      })

      setImages(result.data)
    } catch (error) {
      setError('Sorry, but something went wrong.')
    }
  }

  return (
    <form className="SearchForm" onSubmit={performQuery}>
      <p>Enter a search term:</p>

      <input name="query" type="text" value={query} onChange={handleQueryChange} />

      <div className="ButtonBar">
        <button type="submit" disabled={!query}>Search Giphy!</button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <SearchResults results={images} />
    </form>
  )
}

export default SearchForm
