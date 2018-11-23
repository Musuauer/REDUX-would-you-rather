import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import AllQuestions from './AllQuestions'
import { handleInitialData } from '../actions/shared'
import '../App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount () {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <div className='App'>
          {this.props.noUser === true
            ? <Login />
            : <div>
              <Route path='/' exact component={AllQuestions} />
              {/* <Route path='/question/:id' component={Question} />
              <Route path='/new' component={NewQuestion} /> */}
            </div>
          }

        </div>
      </Router>
    )
  }
}
function mapsStateToProps ({ authedUser }) {
  return {
    noUser: authedUser === null
  }
}

export default connect(mapsStateToProps)(App)
