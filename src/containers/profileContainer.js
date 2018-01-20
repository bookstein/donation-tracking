import React, { Component } from 'react'
import fb from '../firebase'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workouts: [],
    }
  }
  componentWillMount() {
    let workoutsRef = fb
      .database()
      .ref('workouts')
      .orderByKey()
      .limitToLast(100)
    workoutsRef.on('child_added', snapshot => {
      let workout = { text: snapshot.val(), id: snapshot.key }
      this.setState({ workouts: [workout].concat(this.state.workouts) })
    })
  }
  addWorkout = e => {
    e.preventDefault()
    fb
      .database()
      .ref('workouts')
      .push(this.inputEl.value)
    this.inputEl.value = '' // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addWorkout}>
        <label>Workout</label>
        <input type="text" id="exercises" ref={el => (this.inputEl = el)} />
        <input type="submit" />
        <ol>
          {this.state.workouts.map(workout => (
            <li key={workout.id}>{workout.text}</li>
          ))}
        </ol>
      </form>
    )
  }
}

export default ProfileContainer
