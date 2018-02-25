import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/exerciseForm.css'

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exerciseName: null,
      exerciseTag: null,
    }
  }
  static propTypes = {
    submitExercise: PropTypes.func.isRequired,
  }

  submitChange = e => {
    e.preventDefault() // don't forget this!
    const data = this.state
    this.props.submitExercise(data)
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
      <form className="ExerciseForm" onSubmit={this.submitChange}>
        <h3>New Exercise</h3>
        <div className="ExerciseForm__FormGroup">
          <label>Exercise Name</label>
          <input
            type="text"
            name="exerciseName"
            className="ExerciseForm__Input"
            onChange={this.handleChange}
          />
        </div>
        <div className="ExerciseForm__FormGroup">
          <label>Exercise Tag</label>
          <input
            type="text"
            name="exerciseTag"
            className="ExerciseForm__Input"
            onChange={this.handleChange}
          />
        </div>
        <input className="ExerciseForm__Submit" type="submit" />
      </form>
    )
  }
}
