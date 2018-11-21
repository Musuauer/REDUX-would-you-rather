import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleInitialData = dispatch => {
  dispatch(showLoading())
  return getInitialData()
    .then(({ users, questions, authedId }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(authedId))
      dispatch(hideLoading())
    })
}
