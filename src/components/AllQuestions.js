import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import './App.css'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {

  render () {
    return (
      <div className='App'>
      x
      </div>
    )
  }
}

function mapsStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapsStateToProps)(App)
