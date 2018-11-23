import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import styled from 'styled-components'

const AllQuestionsContainer = styled.div`
width: 80%;
margin: 0 auto;
margin-top: 3rem;
border: 2px solid darkblue;
padding: 3rem;
display: flex;
flex-wrap: no-wrap;
justify-content: space-around;
`

class AllQuestions extends Component {
  render () {
    console.log(this.props)
    return (
      <AllQuestionsContainer>
        <div className='unanswered-questions'>
          <h3 className='center'>Unanswered questions</h3>
          <ul className='unanswered-questions-list'>          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />

            </li>
          ))}
          </ul>
        </div>

        <div className='answered-questions'>
          <h3 className='center'>Answered questions</h3>
          <ul className='answered-questions-list'>          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />

            </li>
          ))}
          </ul>
        </div>
      </AllQuestionsContainer>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
  }
}

export default connect(mapStateToProps)(AllQuestions)
