import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
text-decoration: none;
color: rgb(10,10,10);
`

// to style global things... you can build a SharedComponents component
// also... can do "InjectGlobal" in app. ? 
export default class Login extends Component {
    state = {
        users: [],
        newUser: {
            userName: ''
        }
    }

    // REMEMBER!! componentDidMount always goes out of render
    // to avoid infinite loop
    // we have options here to either call axios or call a function to call axios
    componentDidMount = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data })
    }

    handleChange = (event) => {
        // this is the take-change-putback that always happens
        const newUser = {...this.state.newUser}
        newUser[event.target.name] = event.target.value
        this.setState({ newUser })
    }

    // THIS IS A BIG DEAL. POSTING TO API FROM STATE
    handleSubmit = async (event) => {
        event.preventDefault()
        // use axios to send something that was stored in state
        const response = await axios.post('/api/users', this.state.newUser)
        // take something out of state to then be updated
        const users = [...this.state.users]
        // update the thing from state with the new instantiated (?) data from the database
        users.push(response.data)
        // put state back
        this.setState({ users })
    }

    render() {
        // map to make new array of JSX data-items
        const usersList = this.state.users.map((user, i) => {
            return (<div key={i}>
            <StyledLink to={`/users/${user._id}`} >Name: {user.userName}</StyledLink>
            </div>)
        })

        return (
            <div>
                {/* 23ish?. working on the Show All Users part of this page  */}
                {/* we tested with static data in state first  */}
                {/* then we mapped through that array...  */}
                <h1>Login Page</h1>
                {usersList}
                {/* handleSubmit goes in the form tag not submit input!*/}
                <form onSubmit={this.handleSubmit} >
                    <input 
                    type='text'
                    name='userName'
                    value={this.state.newUser.userName}
                    // do this for forms and state things
                    onChange={this.handleChange}
                    />
                    <input type="submit" value="Create New User" />
                </form>
            </div>
        )
    }
}
