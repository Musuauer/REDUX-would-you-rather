import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  addOptionOneText = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }
  addOptionTwoText = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, author } = this.props

    const question = {optionOneText, optionTwoText, author}

    dispatch(handleAddQuestion(question))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }
  render () {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome) {
      return <Redirect to='/all' />
    }

    return (
      <div className='center'>
        <h3>Create a new question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}
        >
          <textarea
            placeholder='Write option one'
            value={optionOneText}
            onChange={this.addOptionOneText}
            className='option'
            maxLength={60}
          />
          <textarea
            placeholder='Write option two'
            value={optionTwoText}
            onChange={this.addOptionTwoText}
            className='option'
            maxLength={60}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
function mapsStateToProps ({ authedUser }) {
  return {
    author: authedUser
  }
}
export default connect(mapsStateToProps)(NewQuestion)
