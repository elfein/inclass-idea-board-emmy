import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// 30????. bringing in styled components

const StyledPage = styled.div`
h1{
  text-align: center;
  margin: 20px 0 100px 0;
}
button {
  background: rgb(30, 30, 120);
  padding: 10px;
  color: rgb(250,250,250);
  font-size: 20px;
  border: none;
  margin: 15px;
}
#interactions {
}
#save-message {
  padding: 15px;
  color: rgb(250,250,250);
  transition: color ease 1s;
  /* remember the ampersand for pseudo-classes */
  &:hover{
    color: rgb(0,0,0);
    transition: color ease 1s, background-color ease 1s;
    background-color: rgb(150, 250, 150)
  }
}
`

const StyledIdeaContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
max-width: 600px;
`

const StyledIdea = styled.div`
background-color: rgb(250,250,190);
width: 30vw;
min-width: 100px;
max-width: 150px;
margin: 15px;
padding: 10px;
height: 150px;
box-shadow: 6px 6px 6px rgb(230,230,230);
div {
  font-size: 14px;
}
&:hover {
  #idea-title > span {
    display: inline;
  }
}
#idea-title {
  font-weight: 700;
  margin: 0 0 10px 0;
  span {
    float: right;
    display: none;
  }
}
`

// ALWAYS MAKE SURE YOU INCLUDE AWAIT WITH YOU ASYNC!!
// 16 make sure to install axios in the client folder not the main folder!!!!!

export default class IdeaBoard extends Component {
  state = {
    user: {},
    ideas: [
    ]
  }

  getUser = async () => {
    // we have to get the props given from Route
    const userId = this.props.match.params.userId
    const response = await axios.get(`/api/users/${userId}`)
    // different ways to get data off of the response from axios, I like this one
    this.setState({
      user: response.data,
      // can reverse an array for things that should be reverse chronological
      ideas: response.data.ideas.reverse()
    })
  }

  // this was to create a new instance of model 2 but a blank, default one. would the 'new Idea' here
  // be used if we were wanting to make something out of a form with specific values?
  handleNew = async () => {
    const userId = this.props.match.params.userId
    const newIdea = await axios.post(`/api/users/${userId}/ideas`)
    await this.getUser()
  }

  // can keep using getUser to update state and rerender
  handleDelete = async (ideaId) => {
    await axios.delete(`/api/users/${this.state.user._id}/ideas/${ideaId}`)
    await this.getUser()
  }

  componentDidMount = () => {
    this.getUser()
  }

  // using cool things to evaluate/get keys off object
  handleChange = (event, i) => {
    const ideas = [...this.state.ideas]
    ideas[i][event.target.name] = event.target.value
    this.setState({ ideas })
  }

  // .put here takes the 'path' to be updated? as well as the content of the updated data... ask about proper vocab for this?
  updateIdea = async (i) => {
    const updatedIdea = this.state.ideas[i]
    await axios.put(`/api/users/${this.props.match.params.userId}/ideas/${updatedIdea._id}`, updatedIdea)
  }

  render() {

    const ideasList = this.state.ideas.map((idea, i) => {
      return <StyledIdea key={i}>
        
        {/* onBlur used here to call updateIdea */}
        <input type='text' id="idea-title" name='title' value={idea.title} 
        onChange={(event) => this.handleChange(event, i)} 
        onBlur={() => this.updateIdea(i)} />
        
        <span onClick={() => this.handleDelete(idea._id)} >x</span>
        
        <input type='text' name='description' value={idea.description} 
        onChange={(event) => this.handleChange(event, i)} 
        onBlur={() => this.updateIdea(i)}  />

      </StyledIdea>
    })

    return (
      <StyledPage>
        <h1>Idea Board for {this.state.user.userName}</h1>
        <div id="interactions">
          <button onClick={this.handleNew}>New Idea</button>
          {/* maybe ask about the dropdown here? sounds complicated :') */}
          <span>Sort ideas by: <button>??</button></span>
          {/* also ask about how to manipulate CSS depending on which functions are called like intended below... */}
          <span id="save-message">All changes saved</span>
        </div>
        <StyledIdeaContainer>
          {ideasList}
        </StyledIdeaContainer>
      </StyledPage>
    )
  }
}
