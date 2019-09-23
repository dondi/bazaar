import React, { Component } from 'react'

import './SearchResults.css'

import GiphyImage from './GiphyImage'

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        {this.props.results.map(image => <GiphyImage key={image.id} image={image} />)}
      </div>
    )
  }
}

export default SearchResults
