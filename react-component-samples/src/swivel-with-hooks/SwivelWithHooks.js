import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './SwivelWithHooks.css'

const STATE_IDLE = 'idle'
const STATE_DRAGGING = 'dragging'

const SwivelWithHooks = props => {
  const { label, onChange } = props

  const [status, setStatus] = useState(STATE_IDLE)
  const [anchorX, setAnchorX] = useState(0)
  const [swivelAngle, setSwivelAngle] = useState(0)

  const handleMouseDown = event => {
    setStatus(STATE_DRAGGING)
    setAnchorX(event.screenX - swivelAngle)
  }

  const handleMouseMove = event => {
    if (status === STATE_DRAGGING) {
      const currentAngle = swivelAngle
      const newAngle = event.screenX - anchorX
      setSwivelAngle(newAngle)

      if (onChange) {
        onChange(currentAngle, newAngle)
      }
    }
  }

  const handleMouseUp = event => {
    if (status === STATE_DRAGGING) {
      setStatus(STATE_IDLE)
    }
  }

  const currentStyle = () => ({
    transform: `perspective(500px) rotateY(${swivelAngle}deg)`
  })

  // Other mouse events go at the level of the document because
  // they might leave the element's bounding box.
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // The listeners are removed via the cleanup function, which if present is given as the return value
    // of the `useEffect` function.
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return (
    <div className="Swivel" onMouseDown={handleMouseDown} style={currentStyle()}>
      {label}
    </div>
  )
}

SwivelWithHooks.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}

export default SwivelWithHooks
