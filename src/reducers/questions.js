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
      return {
        ...state,
        [formattedQuestion.id]: formattedQuestion
      }
    default:
      return state
  }
}
