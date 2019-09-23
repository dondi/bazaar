import React from 'react'

import './GiphyImage.css'

const GiphyImage = props => {
  const { image } = props
  return (
    <div className="GiphyImage">
      <img src={image.images.fixed_width.url} alt={image.source_tld} />
    </div>
  )
}

export default GiphyImage
