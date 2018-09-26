import React, { Component } from 'react'

import './GiphyImage.css'

class GiphyImage extends Component {
  render() {
    const { image } = this.props
    return (
      <div className="GiphyImage">
        <img src={image.images.fixed_width.url} alt={image.source_tld} />
      </div>
    )
  }
}

export default GiphyImage
