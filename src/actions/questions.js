import { _getQuestions, _saveQuestion, _saveQuestionAnswer
} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
})

export const getQuestions = () => dispatch => {
  dispatch(showLoading)

  return _getQuestions()
    .then(questions => dispatch(receiveQuestions(questions)))
    .then(() => dispatch(hideLoading()))
}

export const addQuestion = question => ({
  type: ADD_QUESTION,
  question
})

export const handleAddQuestion = question => dispatch => {
  dispatch(showLoading)

  return _saveQuestion(question)
    .then(formattedQuestion => dispatch(addQuestion(formattedQuestion)))
    .then(() => dispatch(hideLoading()))
}

export const saveQuestionAnswer = answerInfo => ({
  type: SAVE_QUESTION_ANSWER,
  answerInfo
})

export const handleSaveQuestionAnswer = answerInfo => dispatch => {
  dispatch(showLoading)

  return _saveQuestionAnswer(answerInfo)
    .then(() => dispatch(saveQuestionAnswer(answerInfo)))
    .then(() => dispatch(hideLoading()))
}
