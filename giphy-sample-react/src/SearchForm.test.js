import React from 'react'
import TestRenderer from 'react-test-renderer'
import SearchForm from './SearchForm'

// This test suite uses a distinct testing technique called _snapshot testing_. Go take
// a peek at the code then come back here for more commentary.
//
// Note how, with snapshot testing, you are truly dependent on that descriptive text.
// The enforcement is in the snapshot match, not a condition that is in the test code.
// This is where snapshot testing differs from traditional test-driven development:
// _It assumes that the code works initially._ This actually does line up fairly well
// with user interface development, because it tends to be easier to just “eyeball” a
// user interface first rather than write tests against it.
//
// It takes some adjustment to start “trusting” a snapshot test, just as it takes some
// adjustment to trust version control. If you want to manually check whether a snapshot
// is truly in the state that you want it to be, you can always look at the .snap file
// within the __snapshots__ folder.
//
// Handy reference:
// https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest
//
it('should start with an empty search field', () => {
  const component = TestRenderer.create(<SearchForm />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('should start with a disabled search button', () => {
  const component = TestRenderer.create(<SearchForm />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('search button', () => {
  it('should be enabled when the search field is not blank', () => {
    const component = TestRenderer.create(<SearchForm />)
    component.getInstance().setState({
      query: 'i can haz unit tests'
    })

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should be disabled when the search field is blank', () => {
    const component = TestRenderer.create(<SearchForm />)
    component.getInstance().setState({
      query: ''
    })

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
