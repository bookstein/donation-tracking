// this file will make the call to the server for all the exercises
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Exercise from '../components/exercise'
import ExerciseForm from '../components/exerciseForm'
import { listenForUpdates, pushToDatabase } from '../firebaseService'

class ExerciseContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
  }
  componentDidMount() {
    listenForUpdates('exercises', snapshot => {
      let exercise = { text: snapshot.val(), id: snapshot.key }
      this.setState({ exercises: [exercise].concat(this.state.exercises) })
    })
    // let exercisesRef = fb
    //   .database()
    //   .ref('exercises')
    //   .orderByKey()
    //   .limitToLast(100)
    // exercisesRef.on('child_added', snapshot => {
    //   let exercise = { text: snapshot.val(), id: snapshot.key }
    //   this.setState({ exercises: [exercise].concat(this.state.exercises) })
    // })
  }

  submitExercise = data => {
    console.log('exercise submitted', data)
    pushToDatabase('exercises', data)
    // const myRef = fb
    //   .database()
    //   .ref('exercises')
    //   .push()
    // myRef.set(data)
    // console.log(myRef.toString())
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
                key={`${exName}${exTag}${i}`}
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
