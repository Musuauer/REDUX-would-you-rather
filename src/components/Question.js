import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import { handleSaveQuestionAnswer } from '../actions/questions'
import Button from '@material-ui/core/Button'
import Meter from './Meter'
import styled from 'styled-components'

const YourAnswer = styled.div`
font-size: .8rem;
color: rgb(252, 178, 40);
margin-bottom: .1rem;
@media (max-width: 820px) {
}

`

class Question extends Component {
  state = {
    answer: '',
    optionOneVotes: '',
    optionTwoVotes: '',
    optionOnePercent: '',
    optionTwoPercent: '',
    nextQuestion: ''
  }

  componentDidMount () {
    // save answer in state if there is one already
    this.props.myAnswer && this.setState({ answer: this.props.myAnswer })

    this.populateResults()

    // set next question, to be used when user click on Next Question Button
    this.props.unansweredquestions && this.setState({ nextQuestion: this.props.unansweredquestions[1] })
  }

  // save question results in state, to be used for display purposes and make update visible when user answers,
  populateResults = () => {
    const totalUsers = Object.keys(this.props.users).length

    const optionOnePercent = this.optionPercent(this.props.question.optionOne, totalUsers)

    const optionTwoPercent = this.optionPercent(this.props.question.optionTwo, totalUsers)

    const optionOneVotes = this.props.question.optionOne.votes.length
    const optionTwoVotes = this.props.question.optionTwo.votes.length

    this.setState({
      optionOnePercent,
      optionTwoPercent,
      optionOneVotes,
      optionTwoVotes
    })
  }

  handleChange = event => {
    this.setState({ answer: event.target.value })

    this.populateResults()

    const answer = event.target.value
    const { id, authedUser } = this.props

    const answerInfo = {authedUser, id, answer}
    this.props.dispatch(handleSaveQuestionAnswer(answerInfo))
      .then(newState => this.populateResults())
  }

  optionPercent = (option, totalUsers) => {
    const percent = (option.votes.length / totalUsers)
    return percent.toFixed(2)
  }

  // to navigate to next question and reset question information on state
  next = () => {
    this.props.history.push(`/question/${this.state.nextQuestion}`)
    this.setState({
      answer: '',
      optionOneVotes: '',
      optionTwoVotes: '',
      optionOnePercent: '',
      optionTwoPercent: ''
    })

    // set new next question
    this.props.unansweredquestions && this.setState({ nextQuestion: this.props.unansweredquestions[1] })
  }

  render () {
    const { question, users, options, id, myAnswer, unansweredquestions } = this.props
    const { author, optionOne, optionTwo } = question
    const { avatarURL, name } = users[author]

    const { answer, optionOneVotes, optionTwoVotes, optionOnePercent, optionTwoPercent, nextQuestion } = this.state

    return (
      <React.Fragment>
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
                  unansweredquestions={unansweredquestions}
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
                    value={answer}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value='optionOne'
                      control={<Radio color='primary' />}
                      label={optionOne.text}
                      labelPlacement='end'
                      disabled={answer.length > 0}

                    />

                    {/* --- Meter adapted from https://codepen.io/bmorelli25/pen/OgevxO --- */}

                    {answer &&
                    <div className='meter'>
                      {answer === 'optionOne' &&
                      <YourAnswer>
                        your answer
                      </YourAnswer>
                      }
                      <Meter
                        percent={optionOnePercent}
                        width={250}
                        height={17}
                        color='darkblue'
                        label={optionOnePercent}
                      />
                      <div>
                        {optionOneVotes} vote{optionOneVotes === 1 ? '' : 's '}= {optionOnePercent * 100} %
                      </div>
                    </div>

                    }
                    <FormControlLabel
                      value='optionTwo'
                      control={<Radio color='primary' />}
                      label={optionTwo.text}
                      labelPlacement='end'
                      disabled={answer.length > 0}

                    />
                    {answer &&
                    <div className='meter'>
                      {answer === 'optionTwo' &&
                      <YourAnswer>
                      your answer
                      </YourAnswer>
                      }
                      <Meter
                        percent={optionTwoPercent}
                        width={250}
                        height={17}
                        color='darkblue'
                        label={optionTwoPercent}
                      />
                      <div>
                        {optionTwoVotes} votes = {optionTwoPercent * 100} %
                      </div>
                    </div>
                    }
                  </RadioGroup>
                  {!nextQuestion &&
                  <div className='go-to-btn'>
                    <NavLink
                      to={`/question/${id}`}
                      className='navlink'
                    >
                      <Button
                        color='primary'
                        className='solid-button'
                      >
                       Go to question
                      </Button>
                    </NavLink>
                  </div>
                  }
                </FormControl>
              )
            }

          </div>
        </div>
        {
          options && !myAnswer && nextQuestion &&
          <Button
            variant='contained'
            color='primary'
            disabled={answer === ''}
            onClick={this.next}
          >
          Next question
          </Button>
        }
        {
          (!this.props.location.pathname === '/all') &&
          !nextQuestion &&
          myAnswer &&
          <h3>
            You answered all the available questions!
          </h3>
        }

      </React.Fragment>
    )
  }
}
function mapStateToProps ({authedUser, users, questions}, { id }) {
  return {
    authedUser,
    users,
    question: questions[id]
  }
}
export default withRouter(connect(mapStateToProps)(Question))
