import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { users } from '../utils/_DATA'
import { logout } from '../actions/authedUser'
import Button from '@material-ui/core/Button'

const Navi = styled.div`
width: 100%;
margin: 0 auto;

ul{
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-decoration: none;

}

li {
  list-style: none;
  display: inline-block;
  height: 2rem;
  line-height: 2;
}

.active{
  border-bottom: 2px solid darkblue;
}

.username{

}
.avatar-navi{
  height: 2rem;
  vertical-align: middle;
}
.name-navi{
  vertical-align: middle;
}
`

class Nav extends Component {
  logOutUser = () => {
    this.props.dispatch(logout())
    this.props.history.push('/')
  }

  render () {
    return (
      <Navi className='nav'>
        <ul>
          <li>
            <NavLink to='/all' exact activeClassName='active'>
            All Questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
            New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
            </NavLink>
          </li>
          <li className='username'>
            <img
              src={users[this.props.user].avatarURL}
              alt={`Avatar of ${users[this.props.user].name}`}
              className='avatar-navi'
            />
            <span className='name-navi'>
              {users[this.props.user].name}
            </span>

            <Button
              color='primary'
              onClick={this.logOutUser}
            >
            Sign out
            </Button>

          </li>

        </ul>
      </Navi>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    user: authedUser
  }
}
export default withRouter(connect(mapStateToProps)(Nav))
