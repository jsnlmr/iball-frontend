import React, { Component } from 'react'
import PlayerList from './PlayerList'


class CourtDetail extends Component {
  render() {
    return(
      <div style={{
        height: 300,
        width: 250
      }}>
        NAME<br />
        ADDRESS<br />
        HOURS<br />
        <PlayerList />
        <br /><br /><button>Check-In</button>
      </div>
    )
  }
}

export default CourtDetail
