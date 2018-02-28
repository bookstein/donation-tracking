import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import Exercise from '../components/exercise'

// get testing tools
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { removeFromDatabase } from '../firebaseService'

const removeExercise = jest.fn()
const PROPS = {
  removalKey: 'testKey',
  exerciseTag: 'testTag',
  exerciseName: 'testName',
  removeExercise,
}

// happy path: component renders (jest snapshot)
it('renders without crashing', () => {
  const component = renderer.create(<Exercise {...PROPS} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// simulate user behavior
// click X
it('calls the `remove` callback on click', () => {
  const component = shallow(<Exercise {...PROPS} />)
  component.find('.Exercise__X').simulate('click')
  expect(removeExercise).toHaveBeenCalled()
})
