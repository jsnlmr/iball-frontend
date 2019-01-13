import React, { Component } from 'react'

class PlayerList extends Component {

  renderActivePlayers = () => {
    return ['Jay']
  }

  render() {
    const players = this.renderActivePlayers()
    return (
      <div>
      {
        players.length > 0 ? (
          <ol>
            {players.map(p => <li key={p}>{p}</li>)}
          </ol>
        ) : 'No Active Players'

      }
      </div>
    )
  }
}

export default PlayerList
