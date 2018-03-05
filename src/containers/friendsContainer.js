// this file will make the call to the server for all the friends
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Friend from '../components/friend'
import AddFriendForm from '../components/addFriendForm'
import {
  pushToDatabase,
  removeFromDatabase,
  listenForUpdates,
} from '../firebaseService'

class FriendsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [],
    }
  }

  componentDidMount() {
    listenForUpdates('friends', this.buildFriendList)
  }

  buildFriendList = snapshot => {
    const key = snapshot.key
    // if snapshot is from a removed child, don't add the snapshot to state
    if (this.state.friends.filter(e => e.id === key).length > 0) {
      const friends = this.state.friends.filter(e => e.id !== key)
      this.setState({ friends })
    } else {
      // otherwise, add new child
      const exercise = { text: snapshot.val(), id: snapshot.key }
      this.setState({ friends: [exercise].concat(this.state.friends) })
    }
  }

  submitFriend = data => {
    pushToDatabase('friends', data)
  }

  removeFriend = key => {
    removeFromDatabase('friends', key)
  }

  render() {
    const friends = this.state.friends
    return (
      <div classNames="FriendsContainer">
        <h2>Ask Friends to Donate</h2>
        {friends.length > 0 &&
          this.state.friends.map((f, i) => {
            const friendName = f.text.friendName
            const friendTag = f.text.friendTag
            return (
              <Friend
                key={f.id}
                removalKey={f.id}
                removeFriend={this.removeFriend}
                friendName={friendName}
                friendTag={friendTag}
              />
            )
          })}
        <AddFriendForm submitFriend={this.submitFriend} />
      </div>
    )
  }
}

export default FriendsContainer
