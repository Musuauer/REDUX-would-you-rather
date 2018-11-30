import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import AllQuestions from './AllQuestions'
import { handleInitialData } from '../actions/shared'
import '../App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {
  componentDidMount () {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <div className='App'>
          {this.props.user === null
            ? <Route path='/' exact component={Login} />
            : <div>
              <Nav />
              <Switch>
                <Route path='/all' exact component={AllQuestions} />
                {/* <Route path='/question/:id' component={Question} />
              <Route path='/new' component={NewQuestion} /> */}
                <Redirect from='*' to={'/'} />
              </Switch>
            </div>
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
