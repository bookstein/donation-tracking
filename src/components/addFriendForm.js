import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/addFriendForm.css'

const INITIAL_STATE = {
  friendName: '',
  friendTag: '',
}

export default class AddFriendForm extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }
  static propTypes = {
    submitFriend: PropTypes.func.isRequired,
  }

  submitChange = e => {
    e.preventDefault() // don't forget this!
    const data = this.state
    this.props.submitFriend(data)
    this.setState(INITIAL_STATE)
  }

  handleChange = evt => {
    const target = evt.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div className="AddFriendForm">
        <form onSubmit={this.submitChange}>
          <h3>Add New Friend</h3>
          <div className="AddFriendForm__FormGroup">
            <label>Name</label>
            <input
              type="text"
              value={this.state.exerciseName}
              name="friendName"
              className="AddFriendForm__Input"
              onChange={this.handleChange}
            />
          </div>
          <div className="AddFriendForm__FormGroup">
            <label>Passionate about:</label>
            <input
              type="text"
              value={this.state.exerciseTag}
              name="friendTag"
              className="AddFriendForm__Input"
              onChange={this.handleChange}
            />
          </div>
          <input className="AddFriendForm__Submit" type="submit" />
        </form>
      </div>
    )
  }
}
