import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/exercise.css'

class Exercise extends Component {
  render() {
    return (
      <div className="Exercise">
        <h1>Deadlifts</h1>
        <p className="Exercise__Tags">
          Tags:
          <span className="Exercise__Tag">
            <a>back</a>
          </span>
        </p>
        <div className="Exercise__Completions">
          <h3>Recent completions:</h3>
          <p>195 lbs 5 reps</p>
          <p>185 lbs 5 reps</p>
          <p>185 lbs 5 reps</p>
        </div>
      </div>
    )
  }
}

export default Exercise
