import React, { Component } from 'react'
import PlayerList from './PlayerList'


class CourtDetail extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div style={{
        height: 300,
        width: 250
      }}>
        <button onClick={this.props.close}>x</button><br />
        NAME<br />
        ADDRESS<br />
        HOURS<br />
        <PlayerList /><br /><br />
        { this.props.current ? <button>Check-In</button> : null }
      </div>
    )
  }
}

export default CourtDetail
