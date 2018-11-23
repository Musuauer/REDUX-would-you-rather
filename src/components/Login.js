import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { setAuthedUser } from '../actions/authedUser'

const Modal = styled.div`
width: 40%;
margin: 0 auto;
margin-top: 3rem;
border: 2px solid darkblue;
padding: 3rem;
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const titleStyle = {
  marginTop: 0,
  letterSpacing: 1.2
}
const buttonStyle = {
  marginTop: '3rem'
}

class Login extends Component {
  state = {
    id: '',
    open: false
  }

  handleChange = event => {
    event.preventDefault()
    const id = event.target.value
    this.setState({ id })
    this.props.dispatch(setAuthedUser(id))
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
      <Modal>
        <h1
          style={titleStyle}>
            Would you rather... politics!
        </h1>
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
            <MenuItem value={'sarahedo'}>Sarah Edo</MenuItem>
            <MenuItem value={'tylermcginnis'}>Tyler McGinnis</MenuItem>
            <MenuItem value={'johndoe'}>John Doe</MenuItem>
          </Select>
          <Button
            fullWidth
            variant='outlined'
            color='primary'
            style={buttonStyle}
            type='submit'
            disabled={id === ''}
          >
            Start the game!
          </Button>
        </FormControl>

      </Modal>
    )
  }
}

export default connect()(Login)
