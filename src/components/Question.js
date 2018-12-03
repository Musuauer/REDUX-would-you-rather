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

class Question extends Component {
  state = {
    answer: '',
    optionOnePercent: '',
    optionTwoPercent: '',
    nextQuestion: ''
  }

  componentDidMount () {
    this.props.myAnswer && this.setState({ answer: this.props.myAnswer })

    this.props.unansweredquestions && this.setState({ nextQuestion: this.props.unansweredquestions[1] })

    const totalUsers = Object.keys(this.props.users).length

    const optionOnePercent = this.optionPercent(this.props.question.optionOne, totalUsers)

    const optionTwoPercent = this.optionPercent(this.props.question.optionTwo, totalUsers)

    this.setState({ optionOnePercent, optionTwoPercent })
  }

  handleChange = event => {
    this.setState({ answer: event.target.value })
    debugger
    const answer = event.target.value
    const { id, authedUser } = this.props

    const answerInfo = {authedUser, id, answer}
    this.props.dispatch(handleSaveQuestionAnswer(answerInfo))
  }

  optionPercent = (option, totalUsers) => {
    const percent = (option.votes.length / totalUsers)
    return percent.toFixed(2)
  }

  next = () => {
    console.log('NEXTQUESTION222', this.state.nextQuestion)
    this.props.history.push(`/question/${this.state.nextQuestion}`)
    this.setState({ answer: '' })
    this.props.unansweredquestions && this.setState({ nextQuestion: this.props.unansweredquestions[1] })
  }

  render () {
    const { question, users, options, id, myAnswer } = this.props
    const { author, optionOne, optionTwo } = question
    const { avatarURL, name } = users[author]

    const { answer } = this.state

    console.log('qqqquestion props', this.props)
    console.log('NEXTQUESTION111', this.state.nextQuestion)

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

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
                  unansweredquestions={this.props.unansweredquestions}
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
                    {answer &&
                    <div className='meter'>
                      <Meter
                        percent={this.state.optionOnePercent}
                        width={250}
                        height={17}
                        color='darkblue'
                        label={this.state.optionOnePercent}
                      />
                      <div>
                        {this.state.optionOnePercent * 100} %
                      </div>
                    </div>

                    }
                    <FormControlLabel
                      value='optionTwo'
                      control={<Radio color='primary' />}
                      label={optionTwo.text}
                      labelPlacement='end'
                    />
                    {answer &&
                    <div className='meter'>
                      <Meter
                        percent={this.state.optionTwoPercent}
                        width={250}
                        height={17}
                        color='darkblue'
                        label={this.state.optionTwoPercent}
                      />
                      <div>
                        {this.state.optionTwoPercent * 100} %
                      </div>
                    </div>
                    }
                  </RadioGroup>
                </FormControl>
              )
            }

          </div>
        </div>
        {
          options && !myAnswer && this.state.nextQuestion &&
          <Button
            variant='contained'
            color='primary'
            disabled={this.state.answer === ''}
            onClick={this.next}
          >
          Next question
          </Button>
        }
        {
          !this.state.nextQuestion && myAnswer &&
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
