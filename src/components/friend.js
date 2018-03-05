import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/friend.css'

class Friend extends Component {
  static propTypes = {
    removalKey: PropTypes.string.isRequired,
    friendTag: PropTypes.string.isRequired,
    friendName: PropTypes.string.isRequired,
    removeFriend: PropTypes.func.isRequired,
  }

  handleRemoveFriend = () => {
    const k = this.props.removalKey
    this.props.removeFriend(k)
  }

  render() {
    const { friendName, friendTag } = this.props
    return (
      <div className="Friend">
        <div>
          <h1>{friendName}</h1>
          <p className="Friend__Tags">
            Tags:
            <span className="Friend__Tag">{friendTag}</span>
          </p>
          <div className="Friend__Completions">
            <h3>About {friendName}:</h3>
            <p>
              <label>Made a pledge?</label>
              <input type="checkbox" />
            </p>
            <p>
              <label>Amount pledged:</label>
              <input type="text" placeholder="" />
            </p>
          </div>
        </div>
        <div className="Friend__X" onClick={this.handleRemoveFriend}>
          X
        </div>
      </div>
    )
  }
}

export default Friend
