import React, { Component } from 'react'

class PlayerList extends Component {

  constructor(props){
    super(props)
  }

  renderActivePlayers = () => {
    return []//this.props.players.map(p => <li key={p}>{p}</li>)
  }

  render() {
    let players = this.renderActivePlayers()
    return (
      <div>
      {
        players.length > 0 ? (
          <ol>
            <h4>Active Players</h4>
            { players }
          </ol>
        ) : <h4>No Active Players</h4>

      }
      </div>
    )
  }
}

export default PlayerList
