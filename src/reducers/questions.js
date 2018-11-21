import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      const { formattedQuestion } = action

      // adapted from the saveQuestion function in _DATA.js
      return {
        ...state,
        [formattedQuestion.id]: formattedQuestion
      }
    case SAVE_QUESTION_ANSWER :
      const { authedUser, qid, answer } = action.answerInfo

      // adapted from the _saveQuestionAnswer function in _DATA.js
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    default:
      return state
  }
}
