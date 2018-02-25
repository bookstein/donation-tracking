import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class WorkoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
  }
  static propTypes = {
    addWorkout: PropTypes.func.isRequired,
  }

  render() {
    return (
      <form onSubmit={this.addWorkout}>
        <h3>New Workout</h3>
        <div className="form-group exercises">
          <label>Exercise </label>
          <input
            type="text"
            className="exercise"
            ref={el => (this.inputEl = el)}
          />
          <label>Exercise </label>
          <input
            type="text"
            className="exercise"
            ref={el => (this.inputEl = el)}
          />
        </div>
        <input type="submit" />
      </form>
    )
  }
}
