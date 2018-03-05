import React, { Component } from 'react'
import FriendsContainer from './containers/friendsContainer'
import logo from './assets/sjf.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Logo">
          <img src={logo} alt="socialjusticefund.org" />
        </div>
        <div className="Fundraising">
          <FriendsContainer />
        </div>
      </div>
    )
  }
}

export default App
