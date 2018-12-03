import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter } from 'react-router-dom'

class QuestionPage extends Component {
  render () {
    const { id } = this.props

    const unansweredquestions = this.props.questionIds.filter(id => !this.props.answeredQuestionsIds.includes(id))

    console.log('question page props', this.props)
    return (
      <div className='center'>
        <Question
          id={id}
          options
          unansweredquestions={unansweredquestions}
          loaction={this.props.location}
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
