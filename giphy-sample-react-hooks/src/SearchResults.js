import React from 'react'

import './SearchResults.css'

import GiphyImage from './GiphyImage'

const SearchResults = props => (
  <div className="SearchResults">
    {props.results.map(image => <GiphyImage key={image.id} image={image} />)}
  </div>
)

export default SearchResults
