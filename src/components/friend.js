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
          <div className="Friend__Info">
            <h4>Donations:</h4>
            <p>
              <label>Pledged to donate?</label>
              <input className="Friend__formField" type="checkbox" />
            </p>
            <p>
              <label>Amount pledged:</label>
              <span>$</span>
              <input className="Friend__formField" type="text" placeholder="" />
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
