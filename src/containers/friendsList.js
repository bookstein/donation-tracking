// this file will make the call to the server for all the friends
import React, { Component } from 'react'
import Friend from '../components/friend'
import {
  pushToDatabase,
  removeFromDatabase,
  listenForUpdates,
} from '../firebaseService'
import logo from '../assets/sjf.png'
import AddFriendForm from '../components/addFriendForm'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [],
      tags: [],
      error: false,
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
      const friend = { text: snapshot.val(), id: snapshot.key }
      const tag = friend.text.friendTag
      const friends = [friend].concat(this.state.friends)
      const tags = [tag].concat(this.state.tags).filter(t => t.length > 0)
      this.setState({ friends, tags })
    }
  }

  submitFriend = data => {
    pushToDatabase('friends', data).catch(e => this.handleError(e))
  }

  removeFriend = key => {
    removeFromDatabase('friends', key).catch(e => this.handleError(e))
  }

  handleError = e => {
    this.setState({ error: true })
  }

  render() {
    const { friends, tags } = this.state
    return (
      <div className="FriendsList">
        <div className="LeftColumn">
          <img
            src={logo}
            alt="socialjusticefund.org"
            width="214"
            height="270"
          />
          <AddFriendForm tags={tags} submitFriend={this.submitFriend} />
        </div>
        <div className="RightColumn">
          <h2>Ask Friends to Donate</h2>
          {this.state.error && (
            <div className="FriendsList--error">
              An error occurred. Please try again.
            </div>
          )}
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
        </div>
      </div>
    )
  }
}

export default FriendsList
