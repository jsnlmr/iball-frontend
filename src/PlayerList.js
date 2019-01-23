import React, { Component, Fragment } from 'react'

class PlayerList extends Component {

  constructor(props){
    super(props)
  }

  renderActivePlayers = () => {
    return  this.props.players ? this.props.players.map(p => <li key={p.id}>{p.username}</li>) : []
  }

  render() {
    let players = this.renderActivePlayers()
    return (
      <div>
      {
        players.length > 0 ? (
          <Fragment>
            <h4>Active Players</h4>
            <ol>
              { players }
            </ol>
          </Fragment>
        ) : <h4>No Active Players</h4>

      }
      </div>
    )
  }
}

export default PlayerList
