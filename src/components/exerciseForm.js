import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/exerciseForm.css'

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
  }
  static propTypes = {
    addExercise: PropTypes.func.isRequired,
  }

  render() {
    return (
      <form className="ExerciseForm" onSubmit={this.addExercise}>
        <h3>New Exercise</h3>
        <div className="ExerciseForm__FormGroup">
          <label>Exercise Name</label>
          <input
            type="text"
            className="ExerciseForm__Input"
            ref={el => (this.inputEl = el)}
          />
        </div>
        <div className="ExerciseForm__FormGroup">
          <label>Exercise Tag</label>
          <input
            type="text"
            className="ExerciseForm__Input"
            ref={el => (this.inputEl = el)}
          />
        </div>
        <input className="ExerciseForm__Submit" type="submit" />
      </form>
    )
  }
}
