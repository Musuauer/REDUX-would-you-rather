import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import styled from 'styled-components'
import Tab from './Tab'

const AllQuestionsContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;
  border: 2px solid darkblue;
`
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
      <AllQuestionsContainer>
        <Tabs>
          {console.log('tabsss', tabNames)}
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
                <Question id={id} />
              </li>
            ))
            )
            : (this.props.questionIds.filter(id => myAnsweredQuestionsIds.includes(id)).map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))

            )
          }
        </ul>

      </AllQuestionsContainer>
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
