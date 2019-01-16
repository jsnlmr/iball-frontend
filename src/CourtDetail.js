import React, { Component } from 'react'
import PlayerList from './PlayerList'
import { Icon } from 'semantic-ui-react'

const API = 'http://localhost:3001/api/v1'

class CourtDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      active: [],
      at_court: null,
      favorited: null
    }
  }

  checkin = () => {
    let location = {
      player_id: this.props.current.id,
      court_id: this.props.details.id + 1,
      is_active: true,
    }

    this.updatePlayerActivity(location)
  }

  checkout = () => {
    console.log('checking out');
    let location = {
      player_id: this.props.current.id,
      court_id: this.props.details.id + 1,
      is_active: false,
    }

    this.updatePlayerActivity(location)
  }

  updatePlayerActivity = (data) => {
    fetch(`${API}/player_courts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => this.fetchActive())
  }

  fetchActive = () => {
    fetch(`${API}/courts/${this.props.details.id + 1}`)
    .then(res => res.json())
      .then(court => this.setState({
        active: court.active_players,
        at_court: court.active_players.find(p => {
          return  p.username === this.props.current.username })
      })
    )
  }

  componentDidMount() {
    this.fetchActive()
  }

  render() {
    return(
      <div style={{
        height: 300,
        width: 250
      }}>
        <button onClick={this.props.close}>x</button><br />
        <h3>{this.props.details.name}</h3>
        <h4>{this.props.details.address}</h4>

        <span>
          Add Favorite &nbsp; &nbsp;
          <Icon name='star outline' size='big'/>
        </span><br /><br />

        <PlayerList players={this.state.active}/><br /><br />
        {
          this.props.current ?
            this.state.at_court ?
              <button onClick={this.checkout}>Check-Out</button>
              :
              <button onClick={this.checkin}>Check-In</button>
            :
            null
        }
      </div>
    )
  }
}

export default CourtDetail
