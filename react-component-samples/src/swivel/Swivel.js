import React, { Component } from 'react'

import './Swivel.css'

const STATE_IDLE = 'idle'
const STATE_DRAGGING = 'dragging'

class Swivel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATE_IDLE,
      anchorX: 0,
      swivelAngle: 0
    }
  }

  handleMouseDown = event => {
    this.setState({
      status: STATE_DRAGGING,
      anchorX: event.screenX - this.state.swivelAngle
    })
  }

  handleMouseMove = event => {
    if (this.state.status === STATE_DRAGGING) {
      const currentAngle = this.state.swivelAngle
      const newAngle = event.screenX - this.state.anchorX
      this.setState({
        swivelAngle: newAngle
      })
    }
  }

  handleMouseUp = event => {
    if (this.state.status === STATE_DRAGGING) {
      this.setState({
        status: STATE_IDLE
      })
    }
  }

  currentStyle = () => ({
    transform: `perspective(500px) rotateY(${this.state.swivelAngle}deg)`
  })

  // Other mouse events go at the level of the document because
  // they might leave the element's bounding box.
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    const {label, change} = this.props

    return (
      <div className="Swivel" onMouseDown={this.handleMouseDown} style={this.currentStyle()}>
        {label}
      </div>
    )
  }
}

export default Swivel
