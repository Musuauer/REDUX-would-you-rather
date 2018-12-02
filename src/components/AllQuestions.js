import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'
import styled from 'styled-components'
import Tab from './Tab'

const Tabs = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-around;
`

class AllQuestions extends Component {
  state = {
    tabNames: ['Unanswered questions', 'Answered questions'],
    currentTab: 'Unanswered questions'
  }

  setCurrentTab = (tab) => {
    this.setState({ currentTab: tab })
  }

  render () {
    const { setCurrentTab, state: { currentTab, tabNames }, props: { myAnsweredQuestions } } = this

    const myAnsweredQuestionsIds = Object.keys(myAnsweredQuestions)

    return (
      <div className='center'>
        <Tabs>
          {tabNames.map(tabName =>
            <Tab
              currentTab={currentTab}
              key={tabName}
              tabName={tabName}
              onClick={setCurrentTab}
            />
          )
          }

        </Tabs>

        <ul className='questions-list'>
          {this.state.currentTab === 'Unanswered questions'
            ? (this.props.questionIds.filter(id => !myAnsweredQuestionsIds.includes(id)).map((id) => (
              <li key={id}>
                <Link to={`/question/${id}`}>
                  <Question
                    id={id}
                  />
                </Link>
              </li>
            ))
            )
            : (this.props.questionIds.filter(id => myAnsweredQuestionsIds.includes(id)).map((id) => (
              <li key={id}>
                <Question
                  id={id}
                  myAnswer={myAnsweredQuestions[id]}
                />
              </li>
            ))

            )
          }
        </ul>

      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questionIds: Object.keys(questions),
    myAnsweredQuestions: users[authedUser].answers
  }
}

export default connect(mapStateToProps)(AllQuestions)
