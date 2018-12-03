import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter, Redirect } from 'react-router-dom'
import { questions } from '../utils/_DATA'

class QuestionPage extends Component {
  render () {
    const { id, questionIds, answeredQuestionsIds } = this.props

    // check if the question ID exists in the original questions, to prevent reaching an undefined path when typing a wrong ID in the URL or trying to access a question page from a new question, since this 'back-end' doesn't allow it
    const originalQuestionsIds = Object.keys(questions)
    if (!originalQuestionsIds.includes(id)) {
      return <Redirect to='/' />
    }

    const unansweredquestions = questionIds.filter(id => !answeredQuestionsIds.includes(id))

    return (
      <div className='center'>
        <Question
          id={id}
          options
          unansweredquestions={unansweredquestions}
          location={this.props.location}
        />
      </div>
    )
  }
}
function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  return {
    id,
    questionIds: Object.keys(questions),
    answeredQuestionsIds: Object.keys(users[authedUser].answers)

  }
}
export default withRouter(connect(mapStateToProps)(QuestionPage))
