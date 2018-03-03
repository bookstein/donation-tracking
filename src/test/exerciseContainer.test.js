import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import ExerciseContainer from '../containers/exerciseContainer'

// get testing tools
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import * as firebaseService from '../firebaseService'
import { exec } from 'child_process'

jest.mock('../firebaseService', () => {
  return {
    listenForUpdates: jest.fn(),
    pushToDatabase: jest.fn(),
  }
})

const SNAPSHOT_FROM_FIREBASE = {
  key: 'snapshotKey',
  val: () => ({
    exerciseName: 'myCoolExercise',
    exerciseTag: 'legs',
  }),
}
const SNAPSHOT_AS_STATE = {
  id: 'snapshotKey',
  text: { exerciseName: 'myCoolExercise', exerciseTag: 'legs' },
}

/*
HAPPY PATH:
  component renders as we expect
*/
it('renders the happy path', () => {
  const component = renderer.create(<ExerciseContainer />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

/*
BEHAVIOR:
  what behavior does the container itself have?
    1. submitting forms
    2. loading data
*/
it('sets state with initial list of exercises', done => {
  // NOTE: mock needs to match the behavior of the original
  // listenForUpdates('exercises', this.buildExerciseList) -> must pass a fake snapshot into cb
  firebaseService.listenForUpdates.mockImplementation((_, cb) =>
    cb(SNAPSHOT_FROM_FIREBASE),
  )
  const wrapper = mount(<ExerciseContainer />)
  wrapper.update()
  setImmediate(() => {
    const exercises = wrapper.state('exercises')
    expect(exercises).toHaveLength(1)
    expect(exercises[0]).toMatchObject(SNAPSHOT_AS_STATE)
  })
  done()
})
it('sends new exercises to Firebase on form submit', () => {
  // note: this is not really a unit test, more integration test
  firebaseService.listenForUpdates.mockImplementation((_, cb) =>
    cb(SNAPSHOT_FROM_FIREBASE),
  )
  const wrapper = mount(<ExerciseContainer />)
  wrapper.find('.ExerciseForm__Submit').simulate('submit')
  expect(firebaseService.pushToDatabase.mock.calls).toHaveLength(1)
})

/*
EDGE CASES
  what are our container's edges?
    1. calls to external services (Firebase)
      - call fails
      - call returns no data

*/

it('renders an error message if Firebase fails', done => {
  // TODO: find out what errors from Firebase realistically look like
  done()
})
