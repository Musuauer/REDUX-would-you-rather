import React from 'react'

const UserCard = ({ name, avatarURL, questionsAsked, questionsAnswered }) => (
  <div className='usercard'>
    <img
      src={avatarURL}
      alt={`Avatar of ${name}`}
      className='avatar'
    />
    <div className='usercard-info'>
      <span>{name}</span>
      <h4>
        Questions Answered: {questionsAnswered}
      </h4>
      <h4>
        Questions Asked: {questionsAsked}
      </h4>
    </div>
  </div>
)

export default UserCard
