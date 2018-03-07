import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import FriendsContainer from '../containers/friendsContainer'

// get testing tools
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import * as firebaseService from '../firebaseService'

jest.mock('../firebaseService', () => {
  return {
    listenForUpdates: jest.fn(),
    pushToDatabase: jest.fn(),
  }
})

// the "edges" of friends container
jest.mock('../components/friend', () => {
  return () => <div>Friend</div>
})

const SNAPSHOT_FROM_FIREBASE = {
  key: 'snapshotKey',
  val: () => ({
    friendName: 'me',
    friendTag: 'social justice',
  }),
}
const SNAPSHOT_AS_STATE = {
  id: 'snapshotKey',
  text: { friendName: 'me', friendTag: 'social justice' },
}

describe('FriendsContainer', () => {
  beforeEach(() => {
    // FIXME: mock needs to match the behavior of the original
    // listenForUpdates('friends', this.buildExerciseList) -> must pass a fake snapshot into cb
    firebaseService.listenForUpdates.mockImplementation((_, cb) =>
      cb(SNAPSHOT_FROM_FIREBASE),
    )
    firebaseService.pushToDatabase.mockImplementation(() =>
      Promise.resolve('Success'),
    )
  })
  afterEach(() => {
    firebaseService.listenForUpdates.mockReset()
    firebaseService.pushToDatabase.mockReset()
  })
  /*
HAPPY PATH:
  component renders as we expect
*/
  it('renders the happy path', () => {
    const component = renderer.create(<FriendsContainer />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  /*
BEHAVIOR:
  what behavior does the container itself have?
    1. submitting forms
    2. loading data
*/
  it('sets state with initial list of friends', done => {
    const wrapper = mount(<FriendsContainer />)
    wrapper.update()
    setImmediate(() => {
      const friends = wrapper.state('friends')
      expect(friends).toHaveLength(1)
      expect(friends[0]).toMatchObject(SNAPSHOT_AS_STATE)
    })
    done()
  })
  it('sends new friends to Firebase on form submit', () => {
    // note: this is not really a unit test, more integration test
    const wrapper = mount(<FriendsContainer />)
    wrapper.find('.AddFriendForm__Submit').simulate('submit')
    expect(firebaseService.pushToDatabase.mock.calls).toHaveLength(1)
  })

  /*
EDGE CASES
  what are our container's edges?
    1. calls to external services (Firebase)
      - call fails
*/

  it('sets error state if Firebase returns error', done => {
    firebaseService.pushToDatabase.mockImplementationOnce(() =>
      Promise.reject('you got an error!'),
    )
    const wrapper = mount(<FriendsContainer />)
    wrapper.find('.AddFriendForm__Submit').simulate('submit')
    wrapper.update()
    setImmediate(() => {
      expect(wrapper.state('error')).toBe(true)
      done()
    })
  })
})
