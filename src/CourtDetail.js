import React, { Component } from 'react'
import PlayerList from './PlayerList'

const API = 'http://localhost:3001/api/v1'

class CourtDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      active: [],
      court: null
    }
  }

  handleClick = () => {
    let location = {
      player_id: this.props.current.id,
      court_id: this.props.details.id + 1,
      is_active: true,
    }

    fetch(`${API}/player_courts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    })
  }

  componentDidMount() {
    fetch(`${API}/courts/${this.props.details.id + 1}`)
    .then(res => res.json())
      .then(court => this.setState({court: court}))
  }

  render() {
    return(
      <div style={{
        height: 300,
        width: 250
      }}>
        <button onClick={this.props.close}>x</button><br />
        <h3>{this.props.details.name}</h3>
        <h4>{this.props.details.address}</h4><br />

        <PlayerList players={this.state.court.active_players}/><br /><br />
        { this.props.current ? <button onClick={this.handleClick}>Check-In</button> : null }
      </div>
    )
  }
}

export default CourtDetail
