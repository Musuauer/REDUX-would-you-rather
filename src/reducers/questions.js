import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      const { question } = action
      // adapted from the saveQuestion function in _DATA.js
      return {
        ...state,
        [question.id]: question
      }
    case SAVE_QUESTION_ANSWER :
      const { authedUser, id, answer } = action.answerInfo
      // adapted from the _saveQuestionAnswer function in _DATA.js
      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: state[id][answer].votes.concat([authedUser])
          }
        }
      }
    default:
      return state
  }
}
