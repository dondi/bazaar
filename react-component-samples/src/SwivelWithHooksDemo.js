import React from 'react'

import './SwivelDemo.css'

import SwivelWithHooks from './swivel-with-hooks/SwivelWithHooks'

const SwivelWithHooksDemo = props => (
  <div className="Demo">
    <h2>“Swivel” Control Implemented with Hooks</h2>

    <p>
      This component is the same swivel on the outside, but is implemented with hooks on the inside.
      Notice that they are <em>indistinguishable</em> to both the user and the code that uses them.
    </p>

    <div>
      <h5>Samples</h5>

      <div>
        <SwivelWithHooks className="Swivel" label="&nbsp;" onChange={props.onChange} />
        <SwivelWithHooks className="Swivel" label="It’s the same component on the outside" onChange={props.onChange} />
        <SwivelWithHooks className="Swivel" label="So the code that uses it is the same" onChange={props.onChange} />
      </div>
    </div>
  </div>
)

export default SwivelWithHooksDemo
