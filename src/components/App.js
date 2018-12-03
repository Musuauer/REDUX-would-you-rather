import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import AllQuestions from './AllQuestions'
import { handleInitialData } from '../actions/shared'
import '../App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import LeaderBoard from './LeaderBoard'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount () {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
    const loggedUser = this.props.user || null

    this.props.dispatch(handleInitialData(loggedUser))
  }
  render () {
    return (
      <Router>
        <div className='App'>
          {this.props.user === null
            ? <Route path='/' component={Login} />
            : <React.Fragment>
              <Switch>
                <Route path='/all' exact component={AllQuestions} />
                <Route path='/question/:id' exact component={QuestionPage} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/leaderboard' exact component={LeaderBoard} />
                <Route component={NoMatch} />
              </Switch>
              <Nav />
            </React.Fragment>

          }

        </div>
      </Router>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    user: authedUser
  }
}

export default connect(mapStateToProps)(App)
