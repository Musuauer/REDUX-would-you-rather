import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import { handleSaveQuestionAnswer } from '../actions/questions'
import Button from '@material-ui/core/Button'

class Question extends Component {
  state = {
    answer: this.props.myAnswer || ''
  }

  handleChange = event => {
    this.setState({ answer: event.target.value })

    const answer = event.target.value
    const { id, authedUser } = this.props

    const answerInfo = {authedUser, id, answer}
    this.props.dispatch(handleSaveQuestionAnswer(answerInfo))

    // this.props.history.push('/all')
  }

  render () {
    const { question, users, options, id } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }
    const { author, optionOne, optionTwo } = question
    const { avatarURL, name } = users[author]

    const { answer } = this.state
    console.log('question props:', this.props)

    return (
      <div className='card'>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='card-info'>
          <span>{name} asks</span>
          <h4>
              Would you rather...
          </h4>

          {!options
            ? <div className='question-short'>
              {optionOne.text}...
              <NavLink
                to={`/question/${id}`}
                className='navlink'
              >
                <Button
                  variant='contained'
                  color='primary'
                  className='solid-button'
                >
            Answer question
                </Button>
              </NavLink>
            </div>

            : (
              <FormControl
                component='fieldset'
              >
                <RadioGroup
                  aria-label='gender'
                  name='gender2'
                  value={this.state.answer}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value='optionOne'
                    control={<Radio color='primary' />}
                    label={optionOne.text}
                    labelPlacement='end'
                  />
                 
                  <FormControlLabel
                    value='optionTwo'
                    control={<Radio color='primary' />}
                    label={optionTwo.text}
                    labelPlacement='end'
                  />
                </RadioGroup>
              </FormControl>
            )
          }

        </div>
      </div>
    )
  }
}
function mapStateToProps ({authedUser, users, questions}, { id, myAnswer }) {
  return {
    authedUser,
    users,
    question: questions[id]
  }
}
export default withRouter(connect(mapStateToProps)(Question))
