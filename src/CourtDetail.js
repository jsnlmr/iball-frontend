import React, { Component, Fragment } from 'react'
import PlayerList from './PlayerList'
import CourtInfo from './CourtInfo'
import { Icon, Sidebar } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'

class CourtDetail extends Component {
  constructor(props){
    super(props)

    // this.state = {
    //   // court: null,
    //
    //   // at_court: props.court.active_players.find(p => p.id === props.current.id)
    // }
  }


  ///////////////// RENDERING ///////////////

  closeCourt = () => {this.props.history.push('/')}

  allowFavorite = () => {
    return this.props.current ?
      this.props.favorited ?
        <span>
          Remove Favorite &nbsp; &nbsp;
          <Icon onClick={this.props.unfavorite} name='star' size='big' />
        </span>
        :
        <span>
          Add Favorite &nbsp; &nbsp;
          <Icon onClick={this.props.favorite} name='star outline' size='big' />
        </span>
      :
      null
  }

  allowAccess = () => {
    return this.props.current ?
      this.props.atCourt ?
        <button onClick={this.props.checkout}>Check-Out</button>
        :
        <button onClick={this.props.checkin}>Check-In</button>
      :
      null
  }

  componentDidMount() {
    this.props.fetchCourt()
    //this.props.updatePlayerActivity()
    // this.props.getCourt()
    // if(this.props.current) { this.fetchFavorite()}
  }

  render() {
    return(
        <Sidebar id='sidebar' animation='push' direction='left'
          visible={true} vertical='true' >
          <button onClick={this.closeCourt}>x</button><br />
          <CourtInfo court={this.props.court} />

          { this.allowFavorite() }

            <PlayerList players={this.props.court.active_players}/><br /><br />

          { this.allowAccess() }
        </Sidebar>
    )
  }
}

export default withRouter(CourtDetail)


/////////////// PLAYER ACTIVITY ////////////////

// checkin = () => {
//   console.log('checking in');
//   let location = {
//     player_id: this.props.current.id,
//     court_id: this.props.court.id,
//     is_active: true,
//   }
//
//   this.updatePlayerActivity(location)
// }
//
// checkout = () => {
//   console.log('checking out');
//   let location = {
//     player_id: this.props.current.id,
//     court_id: this.props.court.id,
//     is_active: false,
//   }
//
//   this.updatePlayerActivity(location)
// }
//
//
// updatePlayerActivity = (data={
//   player_id: this.props.current.id,
//   court_id: this.props.court.id
// }) => {
//   console.log(data)
//   fetch(`${API}/player_courts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(res => res.json()).then(location => {
//     this.setState({at_court: location.is_active})
//   }).then(
//     fetch(`${API}/courts/${this.props.court.id}`).then(res => res.json())
//     .then(court => {this.setState({active: court.active_players})
//     console.log(this.state.active)})
//   )
  //   {
  //   data.is_active ?
  //     this.setState({
  //     active: [...this.state.active, this.props.current],
  //     at_court: !this.state.at_court
  //     })
  //       :
  //     this.setState({
  //     active: this.state.active.filter(p => p.id !== this.props.current.id),
  //     at_court: !this.state.at_court
  //     })
  // })
// }


// fetchCourt = () => {
//   fetch(`${API}/courts/${this.props.match.params.id}`)
//   .then(res => res.json())
//   .then(court => this.setState({
//     court: court,
//     active: court.active_players,
//     at_court: this.props.current ? court.active_players.find(p => {
//         return  p.username === this.props.current.username }) : null
//     })
//   )
// }

//////////////// FAVORITING ///////////////

// favorite = () => {
//
//   let location = {
//     player_id: this.props.current.id,
//     court_id: this.props.court.id,
//     is_favorite: true,
//   }
//   this.updateFavorite(location)
// }
//
//
// unfavorite = () => {
//
//   let location = {
//     player_id: this.props.current.id,
//     court_id: this.props.court.id,
//     is_favorite: false,
//   }
//
//   this.updateFavorite(location)
// }
//
//
// updateFavorite = data => {
//   fetch(`${API}/player_courts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(() => this.setState({favorited: !this.state.favorited}))
// }
//
//
// fetchFavorite = () => {
//   fetch(`${API}/players/${this.props.current.id}`)
//     .then(res => res.json())
//     .then(player => {
//         console.log(player.favorites);
//         this.setState({
//           favorited: player.favorites.find(c => {
//             return c.id === this.props.court.id
//           })
//         })
//       }
//     )
// }
