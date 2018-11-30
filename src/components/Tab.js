import React, { Component } from 'react'
import styled from 'styled-components'

const StyledTab = styled.div`
  width: 50%;
  font-size: 1.5rem;
  text-align: center;
  padding: .5rem;
  color: ${
  props => props.active
    ? `darkblue`
    : `white`
};
  background: ${
  props => props.active
    ? `white`
    : `darkblue`
};
`

class Tab extends Component {
  // set the current tab when clicking on it
  switchTab = () => {
    const { tabName, onClick } = this.props
    onClick(tabName)
  }

  render () {
    const { switchTab, props: { currentTab, tabName } } = this
    return (
      <StyledTab
        className={currentTab === tabName ? 'tab-list-active' : ''}
        active={currentTab === tabName}
        onClick={switchTab}
      >
        {tabName}
      </StyledTab>
    )
  }
}

export default Tab
