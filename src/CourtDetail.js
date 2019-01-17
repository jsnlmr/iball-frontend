import React, { Component } from 'react'
import PlayerList from './PlayerList'
import { Icon, Sidebar } from 'semantic-ui-react'

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


  /////////////// PLAYER ACTIVITY ////////////////

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

  updatePlayerActivity = data => {
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

      at_court: this.props.current ? court.active_players.find(p => {
          return  p.username === this.props.current.username }) : null
      })
    )
  }

  //////////////// FAVORITING ///////////////

  favorite = () => {
    console.log('adding favorite');

    let location = {
      player_id: this.props.current.id,
      court_id: this.props.details.id + 1,
      is_favorite: true,
    }

    this.updateFavorite(location)
  }

  unfavorite = () => {
    console.log('removing favorite');

    let location = {
      player_id: this.props.current.id,
      court_id: this.props.details.id + 1,
      is_favorite: false,
    }

    this.updateFavorite(location)
  }

  updateFavorite = data => {
    fetch(`${API}/player_courts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => this.fetchFavorite())
  }

  fetchFavorite = () => {
    fetch(`${API}/players/${this.props.current.id}`)
      .then(res => res.json())
      .then(player => this.setState({
        favorited: player.favorites.find(c => {
          return c.id === this.props.details.id + 1
        })
      })

    )
  }

  //////////// LIFECYCLE ////////////////

  componentDidMount() {
    this.fetchActive()
    if(this.props.current) { this.fetchFavorite()}
  }

  render() {
    return(
      <Sidebar id='sidebar' animation='push' direction='left'
        visible={true} vertical='true' >
        <button onClick={this.props.close}>x</button><br />
        <h3>{this.props.details.name}</h3>
        <h4>{this.props.details.address}</h4>

        {
          this.props.current ?
            this.state.favorited ?
              <span>
                Remove Favorite &nbsp; &nbsp;
                <Icon onClick={this.unfavorite}name='star' size='big' />
              </span>
              :
              <span>
                Add Favorite &nbsp; &nbsp;
                <Icon onClick={this.favorite}name='star outline' size='big' />
              </span>
            :
            null
        }

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
      </Sidebar>
    )
  }
}

export default CourtDetail
