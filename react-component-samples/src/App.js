import React, { Component } from 'react'

import './App.css'

import SwivelDemo from './SwivelDemo'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      log: ''
    }
  }

  logEvent = message => this.setState({
    log: `${message}\n${this.state.log}`
  })

  handleSwivelChange = (oldAngle, newAngle) => this.logEvent(`Swivel: Swiveled from ${oldAngle} to ${newAngle}`)

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
            <SwivelDemo onChange={this.handleSwivelChange} />
          </div>

          <div className="Event-log-container">
            <h3>Event Log</h3>

            <pre className="Event-log">
              {this.state.log}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default App
