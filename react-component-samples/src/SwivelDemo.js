import React, { Component } from 'react'

import './SwivelDemo.css'

import Swivel from './swivel/Swivel'

class SwivelDemo extends Component {
  render() {
    return (
      <div className="Demo">
        <h2>“Swivel” Control</h2>

        <p>
          This component demonstrates low-level mouse event handling. We leave what it controls or
          how it is used to your imagination.
        </p>

        <div>
          <h5>Samples</h5>

          <div>
            <Swivel className="Swivel" label="&nbsp;" />
            <Swivel className="Swivel" label="And it’s a regular component" />
            <Swivel className="Swivel" label="So you can set whatever properties you like" />
          </div>
        </div>
      </div>
    )
  }
}

export default SwivelDemo
