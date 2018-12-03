import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class Leaderboard extends Component {
  render () {
    const { users } = this.props
    const usersArray = Object.values(users)
    return (
      <div className='center'>
        <h3>Leader board</h3>

        {/* sort leaders based on total answers and question asked */}
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
