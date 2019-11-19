import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import Swivel from './Swivel'

describe('Swivel direct manipulation component', () => {
  // These are declared here so that the entire test suite can get to them.
  let div
  let swivelComponent

  const transformUpdateTest = () => {
    const swivel = div.querySelector('.Swivel')

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.mouseDown(swivel, { screenX: 20 })
    })

    // We use separate act calls to let the first event “play out” fully before we invoke the next one.
    ReactTestUtils.act(() => {
      // The document-level event isn’t under React’s control so we invoke events on it in the same way that we would
      // do it in a web browser.
      document.dispatchEvent(new MouseEvent('mousemove', { screenX: 10 }))
    })

    // Now we check the element’s rendered style.
    expect(swivel.style.transform).toEqual('perspective(500px) rotateY(-10deg)')

    ReactTestUtils.act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { screenX: 30 }))
    })

    expect(swivel.style.transform).toEqual('perspective(500px) rotateY(10deg)')

    // We do this just for completeness; for _this particular_ component, the event has no rendered effect.
    ReactTestUtils.act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'))
    })
  }

  const swivelAngleUpdateTest = () => {
    const swivel = div.querySelector('.Swivel')

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.mouseDown(swivel, { screenX: 20 })
    })

    ReactTestUtils.act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { screenX: 10 }))
    })

    // Instead of the style, this time we check the component’s internal state value.
    expect(swivelComponent.state.swivelAngle).toBe(-10)

    ReactTestUtils.act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { screenX: 30 }))
    })

    expect(swivelComponent.state.swivelAngle).toBe(10)

    ReactTestUtils.act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'))
    })
  }

  describe('installed behavior with callback', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
      div = document.createElement('div')

      // The `ref` property allows us to hold on to the React component, which we will need when inspecting
      // its state (doable on class-based components only).
      ReactDOM.render(
        <Swivel
          label="Hello swivel"
          onChange={mockOnChange}
          ref={component => swivelComponent = component}
        />,
        div
      )
    })

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div)
    })

    it('should update its CSS transform correctly', transformUpdateTest)
    it('should update its swivel angle correctly', swivelAngleUpdateTest)

    it('should invoke the callback correctly', () => {
      mockOnChange.mockReset()

      const swivel = div.querySelector('.Swivel')

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.mouseDown(swivel, { screenX: 20 })
      })

      ReactTestUtils.act(() => {
        document.dispatchEvent(new MouseEvent('mousemove', { screenX: 10 }))
      })

      // This time, we check whether our callback got invoked correctly.
      expect(mockOnChange.mock.calls[0]).toEqual([0, -10])

      ReactTestUtils.act(() => {
        document.dispatchEvent(new MouseEvent('mousemove', { screenX: 30 }))
      })

      expect(mockOnChange.mock.calls[1]).toEqual([-10, 10])

      // We do this just for completeness; for _this particular_ component, the event has no rendered effect.
      ReactTestUtils.act(() => {
        document.dispatchEvent(new MouseEvent('mouseup'))
      })
    })
  })

  describe('installed behavior without callback', () => {
    beforeEach(() => {
      div = document.createElement('div')
      ReactDOM.render(
        <Swivel
          label="Hello swivel"
          ref={component => swivelComponent = component}
        />,
        div
      )
    })

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div)
    })

    it('should update its CSS transform correctly', transformUpdateTest)
    it('should update its swivel angle correctly', swivelAngleUpdateTest)
  })
})