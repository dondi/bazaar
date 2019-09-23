import React, { Component } from 'react'

import './SearchForm.css'

import SearchResults from './SearchResults'

import { searchGifs } from './api'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      query: '',
      images: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  performQuery = event => {
    event.preventDefault()

    this.setState({
      error: null
    })

    searchGifs({
      rating: 'pg-13',
      q: this.state.query
    }).then(result => this.setState({
      images: result.data
    })).catch(() => this.setState({
      error: 'Sorry, but something went wrong.'
    }))
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={this.performQuery}>
        <p>Enter a search term:</p>

        <input name="query" type="text" value={this.state.query} onChange={this.handleChange} />

        <div className="ButtonBar">
          <button type="submit" disabled={!this.state.query}>Search Giphy!</button>
        </div>

        {this.state.error && (
          <div className="error">
            {this.state.error}
          </div>
        )}

        <SearchResults results={this.state.images} />
      </form>
    )
  }
}

export default SearchForm
