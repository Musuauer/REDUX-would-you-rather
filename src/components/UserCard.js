import React from 'react'
import styled from 'styled-components'

const Points = styled.div`
position: absolute;
    top: 0;
    left: 0;
    margin-right: 3rem;
    border: 2px solid darkblue;
    padding: 1rem;
    color: white;
    background-color: darkblue;
`

const UserCard = ({ name, avatarURL, questionsAsked, questionsAnswered, totalQuestions }) => (
  <div className='card'>
    <Points>
      {totalQuestions} Points
    </Points>
    <img
      src={avatarURL}
      alt={`Avatar of ${name}`}
      className='avatar'
    />
    <div className='card-info'>
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
