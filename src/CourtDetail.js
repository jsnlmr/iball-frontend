import React, { Component } from 'react'
import PlayerList from './PlayerList'
import { Icon, Sidebar } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'

class CourtDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      court: null,
      active: [],
      at_court: null,
      favorited: null
    }
  }


  ///////////////// RENDERING ///////////////

  closeCourt = () => {this.props.history.push('/')}

  allowFavorite = () => {
    return this.props.current ?
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

  allowAccess = () => {
    return this.props.current ?
      this.state.at_court ?
        <button onClick={this.checkout}>Check-Out</button>
        :
        <button onClick={this.checkin}>Check-In</button>
      :
      null
  }


  /////////////// PLAYER ACTIVITY ////////////////

  checkin = () => {
    let location = {
      player_id: this.props.current.id,
      court_id: this.state.court.id,
      is_active: true,
    }

    this.updatePlayerActivity(location)
  }

  checkout = () => {
    console.log('checking out');
    let location = {
      player_id: this.props.current.id,
      court_id: this.state.court.id,
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
    }).then(() => {
      data.is_active ?
        this.setState({
        active: [...this.state.active, this.props.current],
        at_court: !this.state.at_court
        })
          :
        this.setState({
        active: this.state.active.filter(p => p.id !== this.props.current.id),
        at_court: !this.state.at_court
        })
    })
  }


  fetchCourt = () => {
    fetch(`${API}/courts/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(court => this.setState({
      court: court,
      active: court.active_players,
      at_court: this.props.current ? court.active_players.find(p => {
          return  p.username === this.props.current.username }) : null
      })
    )
  }

  //////////////// FAVORITING ///////////////

  favorite = () => {

    let location = {
      player_id: this.props.current.id,
      court_id: this.state.court.id,
      is_favorite: true,
    }
    this.updateFavorite(location)
  }


  unfavorite = () => {

    let location = {
      player_id: this.props.current.id,
      court_id: this.state.court.id,
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
    }).then(() => this.setState({favorited: !this.state.favorited}))
  }


  fetchFavorite = () => {
    fetch(`${API}/players/${this.props.current.id}`)
      .then(res => res.json())
      .then(player => {
        if(this.state.court) {
          this.setState({
            favorited: player.favorites.find(c => {
              return c.id === this.state.court.id
            })
          })
        }
      })
  }

  //////////// LIFECYCLE ////////////////

  componentDidMount() {

    this.fetchCourt()
    if(this.props.current) { this.fetchFavorite()}
  }

  render() {

    return(
      this.state.court ?
        <Sidebar id='sidebar' animation='push' direction='left'
          visible={true} vertical='true' >
          <button onClick={this.closeCourt}>x</button><br />
          <h3>{this.state.court.name}</h3>
          <h4>{this.state.court.address}</h4>

          { this.allowFavorite() }

          <PlayerList players={this.state.active}/><br /><br />

          { this.allowAccess() }
        </Sidebar> : null
    )
  }
}

export default withRouter(CourtDetail)
