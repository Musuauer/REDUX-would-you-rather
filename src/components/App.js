import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'

const Modal = styled.div`
width: 40%;
margin: 0 auto;
margin-top: 5rem;
`
const formStyle = {
  display: 'flex',
  width: '90%',
  wrap: 'nowrap'

}
class App extends Component {
  state = {
    character: '',
    open: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render () {
    return (
      <div className='App'>
        <Modal>
          <h1 className='modal-title'>
            'Would you rather... politics!'
          </h1>
          <FormControl
            style={formStyle}
          >
            <InputLabel htmlFor='open-select'>Choose your character...</InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.character}
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
          </FormControl>
          
        </Modal>
      </div>
    )
  }
}

export default connect()(App)
