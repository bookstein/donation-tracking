// this file will make the call to the server for all the exercises
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Exercise from '../components/exercise'
import ExerciseForm from '../components/exerciseForm'
import {
  pushToDatabase,
  removeFromDatabase,
  listenForUpdates,
} from '../firebaseService'

class ExerciseContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
  }

  componentDidMount() {
    listenForUpdates('exercises', this.buildExerciseList)
  }

  buildExerciseList = snapshot => {
    const key = snapshot.key
    // if snapshot is from a removed child, don't add the snapshot to state
    if (this.state.exercises.filter(e => e.id === key).length > 0) {
      const exercises = this.state.exercises.filter(e => e.id !== key)
      this.setState({ exercises })
    } else {
      // otherwise, add new child
      const exercise = { text: snapshot.val(), id: snapshot.key }
      this.setState({ exercises: [exercise].concat(this.state.exercises) })
    }
  }

  submitExercise = data => {
    pushToDatabase('exercises', data)
  }

  removeExercise = key => {
    removeFromDatabase('exercises', key)
  }

  render() {
    const exercises = this.state.exercises
    return (
      <div>
        {exercises.length > 0 &&
          this.state.exercises.map((ex, i) => {
            const exName = ex.text.exerciseName
            const exTag = ex.text.exerciseTag
            return (
              <Exercise
                key={ex.id}
                removalKey={ex.id}
                removeExercise={this.removeExercise}
                exerciseName={exName}
                exerciseTag={exTag}
              />
            )
          })}
        <ExerciseForm submitExercise={this.submitExercise} />
      </div>
    )
  }
}

export default ExerciseContainer
