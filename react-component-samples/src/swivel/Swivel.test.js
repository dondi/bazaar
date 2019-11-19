import React from 'react'
import renderer from 'react-test-renderer'

import Swivel from './Swivel'

describe('Swivel direct manipulation component', () => {
  let swivel

  const transformUpdateTest = () => {
    let tree = swivel.toJSON()
    expect(tree).toMatchSnapshot()

    const swivelInstance = swivel.getInstance()
    swivelInstance.handleMouseDown({ screenX: 20 })
    swivelInstance.handleMouseMove({ screenX: 10 })

    // We check against the style attribute because the CSS property will be the generalized 'converted'
    // value of the transform, which is too unwieldy to express manually.
    //
    // CSS also automatically adds the semicolons.
    tree = swivel.toJSON()
    expect(tree).toMatchSnapshot()

    swivelInstance.handleMouseMove({ screenX: 30 })
    tree = swivel.toJSON()
    expect(tree).toMatchSnapshot()

    swivelInstance.handleMouseUp()
    tree = swivel.toJSON()
    expect(tree).toMatchSnapshot()
  }

  const swivelAngleUpdateTest = () => {
    let tree = swivel.toJSON()
    expect(tree).toMatchSnapshot()

    const swivelInstance = swivel.getInstance()
    swivelInstance.handleMouseDown({ screenX: 20 })
    swivelInstance.handleMouseMove({ screenX: 10 })
    expect(swivelInstance.state.swivelAngle).toBe(-10)

    swivelInstance.handleMouseMove({ screenX: 30 })
    expect(swivelInstance.state.swivelAngle).toBe(10)

    swivelInstance.handleMouseUp()
  }

  describe('installed behavior with callback', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
      swivel = renderer.create(<Swivel label="Hello swivel" onChange={mockOnChange} />)
    })

    it('should update its CSS transform correctly', transformUpdateTest)
    it('should update its swivel angle correctly', swivelAngleUpdateTest)

    it('should invoke the callback correctly', () => {
      mockOnChange.mockReset()

      const swivelInstance = swivel.getInstance()
      swivelInstance.handleMouseDown({ screenX: 20 })
      swivelInstance.handleMouseMove({ screenX: 10 })
      expect(mockOnChange.mock.calls[0]).toEqual([0, -10])

      swivelInstance.handleMouseMove({ screenX: 30 })
      expect(mockOnChange.mock.calls[1]).toEqual([-10, 10])

      swivelInstance.handleMouseUp()
    })
  })

  describe('installed behavior without callback', () => {
    beforeEach(() => {
      swivel = renderer.create(<Swivel label="Hello swivel" />)
    })

    it('should update its CSS transform correctly', transformUpdateTest)
    it('should update its swivel angle correctly', swivelAngleUpdateTest)
  })
})
