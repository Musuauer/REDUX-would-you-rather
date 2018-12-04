import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const { setCurrentTab, state: { currentTab, tabNames }, props: { myAnswers, questionIds, myAnsweredQuestionsIds } } = this

    const myUnansweredQuestions = questionIds.filter(id => !myAnsweredQuestionsIds.includes(id))

    const myAnsweredQuestions = questionIds.filter(id => myAnsweredQuestionsIds.includes(id))

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

        {/* conditional rendering of answered or unanswered questions based on current tab */}
        <ul className='questions-list'>
          {(currentTab === 'Unanswered questions'
            ? myUnansweredQuestions
            : myAnsweredQuestions)
            .map((id) => (
              <li key={id}>
                <Question
                  id={id}
                  myAnswer={myAnswers[id]}
                  options={currentTab !== 'Unanswered questions'}
                />
              </li>
            ))}
        </ul>

      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questions,
    questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    myAnswers: users[authedUser].answers,
    myAnsweredQuestionsIds: Object.keys(users[authedUser].answers)
  }
}

export default connect(mapStateToProps)(AllQuestions)
