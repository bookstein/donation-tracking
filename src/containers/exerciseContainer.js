// this file will make the call to the server for all the exercises
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Exercise from '../components/exercise'
import ExerciseForm from '../components/exerciseForm'

class ExerciseContainer extends Component {
  render() {
    return (
      <div>
        <Exercise />
        <ExerciseForm
          addExercise={ex => console.log('exercise submitted', ex)}
        />
      </div>
    )
  }
}

export default ExerciseContainer
