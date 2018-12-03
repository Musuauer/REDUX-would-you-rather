import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

// adapted from https://tylermcginnis.com/react-router-handling-404-pages/

class NoMatch extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.logOutUser()
    }, 4000)
  }

  logOutUser = () => {
    this.props.dispatch(logout())
    this.props.history.push('/')
  }
  render () {
    return (
      <div className='center'>
        <h3>Page not found</h3>
        <h4>You will be redirected to Sign In...</h4>
      </div>
    )
  }
}

export default connect()(NoMatch)
