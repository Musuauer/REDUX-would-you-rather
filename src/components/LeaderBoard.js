import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class Leaderboard extends Component {
  render () {
    const { users } = this.props
    console.log('users...', users)
    const usersArray = Object.values(users)
    return (
      <div className='center'>
        <h3>Leaderboard</h3>
        {usersArray.sort((a, b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length)).map(user => {
          const asked = user.questions.length
          const answered = Object.keys(user.answers).length
          const totalQuestions = asked + answered
          return <UserCard
            key={user.id}
            name={user.name}
            avatarURL={user.avatarURL}
            questionsAsked={asked}
            questionsAnswered={answered}
            totalQuestions={totalQuestions}
          />
        }
        )}
      </div>
    )
  }
}

function mapsStateToProps ({ users }) {
  return {
    users
  }
}
export default connect(mapsStateToProps)(Leaderboard)
