import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'

class Question extends Component {
  state = {
    value: ''
  }

  toParent = (e, id) => {
    e.preventDefault()
    // this.props.history.push(`/tweet/${id}`)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  render () {
    console.log('question props:', this.props)
    const { question, users } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }
    const {
      id, author, optionOne, optionTwo
    } = question
    const { avatarURL, name } = users[author]

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{name} asks</span>
            <h2>
              Would you rather...
            </h2>
            <FormControl
              component='fieldset'
            // className={classes.formControl}
            >
              <RadioGroup
                aria-label='gender'
                name='gender2'
                // className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value='optionOne'
                  control={<Radio color='primary' />}
                  label={optionOne.text}
                  labelPlacement='start'
                />
                <FormControlLabel
                  value='optionTwo'
                  control={<Radio color='primary' />}
                  label={optionTwo.text}
                  labelPlacement='start'
                />
              </RadioGroup>
            </FormControl>

          </div>
        </div>
      </Link>
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
