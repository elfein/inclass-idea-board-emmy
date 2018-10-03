import React, { Component } from 'react'
import axios from 'axios'

// 16 make sure to install axios in the client folder!!!!!

export default class IdeaBoard extends Component {
    state = {
        response: {}
    }

getUsers = () => {
    axios.get('/api/users')
    .then(response => console.log(response))
}

componentDidMount = () => {
    this.getUsers()
}

  render() {
    return (
      <div>
        IDEA BOARD
      </div>
    )
  }
}