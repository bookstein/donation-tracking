import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import Friend from '../components/Friend'

// get testing tools
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { removeFromDatabase } from '../firebaseService'

const removeFriend = jest.fn()
const PROPS = {
  removalKey: 'testKey',
  friendTag: 'testTag',
  friendName: 'testName',
  removeFriend,
}

// happy path: component renders (jest snapshot)
it('renders without crashing', () => {
  const component = renderer.create(<Friend {...PROPS} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// simulate user behavior
// click X
it('calls the `remove` callback on click', () => {
  const component = shallow(<Friend {...PROPS} />)
  component.find('.Friend__X').simulate('click')
  expect(removeFriend).toHaveBeenCalled()
})
