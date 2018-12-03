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
    currentTab: 'Unanswered questions',
    myAnsweredQuestions: [],
    myUnansweredQuestions: []

  }

  componentDidMount = () => {
    this.setState({ myUnansweredQuestions: this.props.questionIds.filter(id => !this.props.myAnsweredQuestionsIds.includes(id)) })

    this.setState({ myAnsweredQuestions: this.props.questionIds.filter(id => this.props.myAnsweredQuestionsIds.includes(id)) })
  }

  setCurrentTab = (tab) => {
    this.setState({ currentTab: tab })
  }

  render () {
    const { setCurrentTab, state: { currentTab, tabNames }, props: { myAnswers } } = this

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
            ? (
              this.state.myUnansweredQuestions.map((id) => (
                <li key={id}>
                  <Question
                    id={id}
                    options={false}
                  />
                </li>
              ))
            )
            : (
              this.state.myAnsweredQuestions.map((id) => (
                <li key={id}>
                  <Question
                    id={id}
                    myAnswer={myAnswers[id]}
                    options
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
    myAnswers: users[authedUser].answers,
    myAnsweredQuestionsIds: Object.keys(users[authedUser].answers)
  }
}

export default connect(mapStateToProps)(AllQuestions)
