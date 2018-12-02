import { getInitialData } from '../utils/_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleInitialData = (loggedUser) => dispatch => {
  dispatch(showLoading())
  return getInitialData()
    .then(({ users, questions }) => {
      console.log('get inital data', loggedUser)
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(loggedUser))
      dispatch(hideLoading())
    })
}
