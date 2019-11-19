import React, { useState } from 'react'

import './App.css'

import SwivelDemo from './SwivelDemo'
import SwivelWithHooksDemo from './SwivelWithHooksDemo'

const App = () => {
  const [log, setLog] = useState('')

  const logEvent = message => setLog(`${message}\n${log}`)
  const handleSwivelChange = (oldAngle, newAngle) => logEvent(`Swivel: Swiveled from ${oldAngle} to ${newAngle}`)

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
          <SwivelDemo onChange={handleSwivelChange} />
          <SwivelWithHooksDemo onChange={handleSwivelChange} />
        </div>

        <div className="Event-log-container">
          <h3>Event Log</h3>

          <pre className="Event-log">
            {log}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
