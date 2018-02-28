import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/exercise.css'

class Exercise extends Component {
  static propTypes = {
    removalKey: PropTypes.string.isRequired,
    exerciseTag: PropTypes.string.isRequired,
    exerciseName: PropTypes.string.isRequired,
    removeExercise: PropTypes.func.isRequired,
  }

  handleRemoveExercise = () => {
    const k = this.props.removalKey
    this.props.removeExercise(k)
  }

  render() {
    const { exerciseName, exerciseTag } = this.props
    return (
      <div className="Exercise">
        <div>
          <h1>{exerciseName}</h1>
          <p className="Exercise__Tags">
            Tags:
            <span className="Exercise__Tag">{exerciseTag}</span>
          </p>
          <div className="Exercise__Completions">
            <h3>Recent completions:</h3>
            <p>195 lbs 5 reps</p>
            <p>185 lbs 5 reps</p>
            <p>185 lbs 5 reps</p>
          </div>
        </div>
        <div className="Exercise__X" onClick={this.handleRemoveExercise}>
          X
        </div>
      </div>
    )
  }
}

export default Exercise
