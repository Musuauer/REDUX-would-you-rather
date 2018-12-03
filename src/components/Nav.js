import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { users } from '../utils/_DATA'
import { logout } from '../actions/authedUser'
import Button from '@material-ui/core/Button'
import HamburgerMenu from 'react-hamburger-menu'

const Navi = styled.div`
    background-color: white;
    width: 79.9%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 99;
    padding-bottom: 1rem;
`

class Nav extends Component {
  state = {
    open: false
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  logOutUser = () => {
    this.props.dispatch(logout())
    this.props.history.push('/')
  }

  render () {
    return (
      <React.Fragment>
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

        <div className='mobile-nav'>

          <div className='menu-btn' id='menu-btn'>
            <HamburgerMenu
              isOpen={this.state.open}
              menuClicked={this.handleClick}
              width={28}
              height={15}
              strokeWidth={2}
              rotate={0}
              color='darkblue'
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>

          {this.state.open === true &&
(
  <div className='responsive-menu close-btn'>
    <div className='menu-content'>
      <ul>
        <li>
          <NavLink
            to='/all'
            exact
            activeClassName='active'
            onClick={this.handleClick}
          >
            All Questions
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/add'
            activeClassName='active'
            onClick={this.handleClick}
          >
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/leaderboard'
            activeClassName='active'
            onClick={this.handleClick}
          >
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
            variant='outlined'
            onClick={this.logOutUser}
          >
            Sign out
          </Button>

        </li>

      </ul>
    </div>
  </div>
)
          }

        </div>

      </React.Fragment>

    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    user: authedUser
  }
}
export default withRouter(connect(mapStateToProps)(Nav))
