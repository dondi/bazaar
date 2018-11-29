import React, { Component } from 'react'

import './App.css'

import SwivelDemo from './SwivelDemo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Component Demonstration Gallery</h1>

          <p>
            Because “components” are the core of React’s technology, there is nothing particularly special
            about making them reusable, code-wise. Perhaps the only difference is that the truly “reusable”
            components are styled/designed to be that way, with additional customization properties that
            “non-reusable” components might have.
          </p>
        </header>

        <div className="Main">
          <div className="Demo-container">
            <SwivelDemo />
          </div>

          <div className="Event-log-container">
            <h3>Event Log</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default App
