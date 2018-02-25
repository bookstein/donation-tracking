// this file will make the call to the server for all the exercises
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Exercise from '../components/exercise'
import ExerciseForm from '../components/exerciseForm'
import fb from '../firebase'

class ExerciseContainer extends Component {
  submitExercise = data => {
    console.log('exercise submitted', data)
    const myRef = fb
      .database()
      .ref('exercises')
      .push()
    myRef.set(data)
    console.log(myRef.toString())
  }

  render() {
    return (
      <div>
        <Exercise />
        <ExerciseForm submitExercise={this.submitExercise} />
      </div>
    )
  }
}

export default ExerciseContainer
