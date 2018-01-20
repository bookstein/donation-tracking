import React, { Component } from 'react'

export default class WorkoutForm extends Component {
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
