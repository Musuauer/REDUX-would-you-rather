import { RECEIVE_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SAVE_QUESTION_ANSWER:
      const { authedUser, id, answer } = action.answerInfo
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer
          }
        }
      }
    case ADD_QUESTION:
      const { question } = action
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: {
            ...state[question.author].questions.concat([question.id])
          }
        }
      }
    default:
      return state
  }
}
