import React, { Component } from 'react'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  dipsplayNav = () => {
    return ( this.props.current ? (
      <div>
        <span>iBall</span>
        <span>FRIENDS</span>
        <span>FAVORITES</span>
        <span>PROFILE</span>
        <span>LOGOUT</span>
      </div>
    ) : (
      <div>
        <span>iBall</span>
        <span>
          <label>Username</label>
          <input />
        </span>
        <span>
          <label>Password</label>
          <input />
        </span>
      </div>
      )
    )
  }

  render() {
    return this.dipsplayNav()
  }
}

export default Navbar
