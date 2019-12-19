import React, { Component, Fragment } from 'react'
import './App.css'
import Navbar from './Navbar'
import MapDisplay from './MapDisplay'
import CourtDetail from './CourtDetail'
import Signup from './Signup'
import PlayerProfile from './PlayerProfile'
import { Menu, Sidebar, Segment, Container } from 'semantic-ui-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const API = 'http://localhost:3001/api/v1'
const MAP_URLS = ['/', '/courts/:id']


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      friends: [],
      courts: [],
      favorites: [],
      currentUser: null,
      loading: true
    }
  }

  fetchCourt = (id=null) => {
    let courtId
    if(id) { courtId = id}
    else { courtId = this.props.location.pathname.split('/')[2] }

    fetch(`${API}/courts/${courtId}`).then(res => res.json())
      .then(court => {
        this.setState({
          currentCourt: court
        })

        if(this.state.currentUser && !this.state.loading) {
          this.setState({
            favorited: this.state.currentUser.favorites,
            // atCourt: court.active_players.includes(p => p.id === this.state.currentUser.id)
          })
        }
       })

    // fetch(`${API}/courts/${this.props.match.params.id}`)
    // .then(res => res.json())
    // .then(court => this.setState({
    //   court: court,
    //   active: court.active_players,
    //   at_court: this.props.current ? court.active_players.find(p => {
    //       return  p.username === this.props.current.username }) : null
    //   })
    // )
  }


  /////////// MAP & NAVBAR RENDER //////////
  renderNavbar = () => {
    return (
      <Fragment>
        <Navbar current={this.state.currentUser} login={this.loginUser} logout={this.logoutUser} favorites={this.state.favorites}
        fetchCourt={this.fetchCourt} />
      </Fragment>
    )
  }

  showProfile = () => {
    return this.state.currentUser ?
      <PlayerProfile current={this.state.currentUser}
        delete={this.deletePlayer} update={this.updatePlayer} />
        : <Redirect to='/' />
  }

  renderMap = () => {
    return (
      <Fragment>
        <MapDisplay showCourt={this.showCourt} courts={this.state.courts}  currentCourt={this.state.currentCourt} />
      </Fragment>
    )
  }

  //////////// COURT POPUP ////////////


  showCourt = e => {
    //this.props.history.push('/')

      fetch(`${API}/courts/${e.feature.properties.id + 1}`)
        .then(res => res.json()).then(court => {
          this.setState({
            currentCourt: court,
            atCourt: this.state.currentUser ? court.active_players.find(p => p.id === this.state.currentUser.id) : null
          })

          if(this.state.currentUser) {
            fetch(`${API}/players/${this.state.currentUser.id}`)
            .then(res => res.json())
            .then(player => {
                this.setState({
                  favorited: player.favorites.find(c => {
                    return c.id === court.id
                  })
                })
              }
            )}

        // active: court.active_players,
        // at_court: this.props.current ? court.active_players.find(p => {
        //     return  p.username === this.props.current.username }) : null
      }).then(this.props.history.push(`/courts/${e.feature.properties.id + 1}`))

    //this.props.history.push(`/courts/${e.feature.properties.id + 1}`)
  }

  ////////////////////////////////////

  checkin = () => {
    let location = {
      player_id: this.state.currentUser.id,
      court_id: this.state.currentCourt.id,
      is_active: true,
    }

    this.updatePlayerActivity(location)
  }

  checkout = () => {
    let location = {
      player_id: this.state.currentUser.id,
      court_id: this.state.currentCourt.id,
      is_active: false,
    }

    this.updatePlayerActivity(location)
  }


  updatePlayerActivity = (data={
    player_id: this.state.currentUser.id,
    court_id: this.state.currentCourt.id
  }) => {
    fetch(`${API}/player_courts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(location => {

      this.setState({atCourt: location.is_active})
    })
    .then(() => {
      fetch(`${API}/courts/${this.state.currentCourt.id}`).then(res => res.json())
      .then(court => {

        this.setState({currentCourt: court})
    })})
  }

  //////////////// FAVORITING ///////////////

  favorite = () => {
    let location = {
      player_id: this.state.currentUser.id,
      court_id: this.state.currentCourt.id,
      is_favorite: true,
    }
    this.updateFavorite(location)
  }


  unfavorite = () => {

    let location = {
      player_id: this.state.currentUser.id,
      court_id: this.state.currentCourt.id,
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
    .then(() => {
      fetch(`${API}/players/${this.state.currentUser.id}`)
      .then(res => res.json()).then(player => {
        this.setState({
          currentUser: player,
          favorites: player.favorites
        })
      })
    })
  }

  ////////////// PLAYER MANAGEMENT ////////////////

  loginUser = player => {
    this.setState({
      currentUser: player,
      favorites: player.favorites,
      atCourt: this.state.currentCourt ? this.state.currentCourt.active_players.find(p => p.id === player.id) : null
    })
    if(this.props.location.pathname === '/signup') {
      this.props.history.push('/')
    }
  }

  logoutUser = () => {
    localStorage.removeItem('token')
    this.setState({currentUser: null},
      this.props.history.push('/')
    )

  }

  newPlayer = player => {
    let players = [...this.state.players, player]

    this.setState({
      players: players,
      currentUser: player
    }, this.props.history.push('/'))
  }

  deletePlayer = player => {
    this.setState({
      players: this.state.players.filter(p => p.id !== player.id),
      currentUser: null
    }, this.props.history.push('/'))
  }

  updatePlayer = player => {
    //let players = this.state.players.filter(p => p.id !== player.id)

    this.setState({
      //players: [...players, player],
      currentUser: player
    }, this.props.history.push('/'))
  }

  /////////// LIFECYCLE //////////////

  componentDidMount() {
    if(this.props.match.url === '/courts') {
      this.fetchCourt(this.props.location.pathname.split('/')[2])
    }

    fetch(`${API}/courts`).then(res => res.json()).then(courts => {
      this.setState({courts: courts})
    })

    fetch(`${API}/players`).then(res => res.json()).then(players => {
      this.setState({players: players})
    })

    let token = localStorage.getItem('token')

    if(token) {
      fetch(`${API}/profile`, {
        method: 'GET',
        headers: {
          'Authentication': `Bearer ${token}`
        }
      }).then(res => res.json()).then(player => {
          this.setState({
          currentUser: player,
          favorites: player.favorites,
          loading: false
        })
      })
    } else {
      this.setState({loading: false})
    }
  }

  render() {
    return (

      <div id='app'>
        <Sidebar.Pushable>
          <Fragment>
            { this.state.loading ? null : this.renderNavbar() }
          </Fragment>
          <Sidebar.Pusher>
              {
                MAP_URLS.includes(this.props.location.pathname)
                  || this.props.location.pathname.split('/')[1] === 'courts'
                    ? this.renderMap() : null
              }
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Switch>
          <Route exact path='/signup' render={() =>
            <Signup login={this.loginUser} /> } />

          <Route exact path='/profile' render={() => this.state.loading ? null : this.showProfile()
          } />

          {
            this.state.currentCourt ? <Route exact path='/courts/:id' render={() => {
            return (
              <Fragment>
                <CourtDetail current={this.state.currentUser} court={this.state.currentCourt} favorited={this.state.favorited}
                favorite={this.favorite} unfavorite={this.unfavorite}
                checkin={this.checkin} checkout={this.checkout}
                updatePlayerActivity={this.updatePlayerActivity}
                atCourt={this.state.atCourt} fetchCourt={this.fetchCourt}
                />
              </Fragment>
            )
            }} /> : null
        }
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courts: state.courts
  }
}

export default withRouter(App);


// handleMouseEnter = () => {
//   this.map.style = {cursor: 'pointer'}
// }

// onMapLoad = map => {
//     console.log(map);
// }
