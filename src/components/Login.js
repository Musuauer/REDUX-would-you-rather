import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import { setAuthedUser } from '../actions/authedUser'
import { users } from '../utils/_DATA'

const LoginForm = styled.div`
width: 40%;
margin: 0 auto;
margin-top: 3rem;
border: 2px solid darkblue;
padding: 3rem;
display: flex;
flex-wrap: wrap;
justify-content: center;
@media (max-width: 820px) {
  width: 80%;
  padding: 3rem 1rem;
}
`

const titleStyle = {
  marginTop: 0,
  letterSpacing: 1.2
}

class Login extends Component {
  state = {
    id: '',
    open: false
  }

  // get ID from selected character and load homepage
  handleChange = event => {
    event.preventDefault()
    const id = event.target.value
    this.setState({ id })
    setTimeout(() => this.props.dispatch(setAuthedUser(id)), 500)
    this.props.history.push('/all')
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render () {
    const { id, open } = this.state

    return (
      <LoginForm>
        <h1
          style={titleStyle}>
            Would you rather...
        </h1>

        {/* Form adapted from Material UI */}
        <FormControl
          onSubmit={this.startGame}
          fullWidth
        >
          <InputLabel htmlFor='open-select'>Choose your character...</InputLabel>
          <Select
            open={open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={id}
            onChange={this.handleChange}
            inputProps={{
              name: 'character',
              id: 'open-select'
            }}
          >
            {Object.entries(users).map(user =>
              <MenuItem
                value={user[1].id}
                key={user[1].id}
              >
                {user[1].name}
              </MenuItem>
            )
            }
          </Select>
        </FormControl>

      </LoginForm>
    )
  }
}

export default connect()(Login)
