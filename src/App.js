import React, { Component, Fragment } from 'react'
import './App.css'
import Navbar from './Navbar'
import MapDisplay from './MapDisplay'
import CourtDetail from './CourtDetail'
import Signup from './Signup'
import PlayerProfile from './PlayerProfile'
import { Menu, Sidebar, Segment, Container } from 'semantic-ui-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'
const NAV_URLS = ['/', '/profile', '/courts/:id']
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
      loading: true,
    }
  }

  fetchCourt = () => {
    console.log('getting court', this.props);
    let courtId = this.props.location.pathname.split('/')[2]
    console.log(courtId);
    fetch(`${API}/courts/${courtId}`).then(res => res.json())
      .then(court => {
        this.setState({
          currentCourt: court
        })
        console.log(this.state.currentUser);
        if(this.state.currentUser && !this.state.loading) {
          this.setState({
            favorited: this.state.currentUser.favorites,
            atCourt: court.active_players.includes(p => p.id === this.state.currentUser.id)
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
        <Navbar current={this.state.currentUser} login={this.loginUser} logout={this.logoutUser} favorites={this.state.favorites}/>
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
        <MapDisplay showCourt={this.showCourt}
          courts={this.state.courts} />
      </Fragment>
    )
  }

  //////////// COURT POPUP ////////////

  showCourt = e => {
    this.props.history.push('/')
    this.props.history.push(`/courts/${e.feature.properties.id + 1}`)
  }

  ////////////// PLAYER MANAGEMENT ////////////////

  loginUser = player => {
    // e.preventDefault()
    // e.persist()

    // let player = {
    //   username: e.target[0].value,
    //   player: e.target[1].value
    // }

    // this.setState({
    //   currentUser: this.state.players.find(p => {
    //     return p.username === player.username
    //   }, this.props.history.push(`${this.props.location.pathname}`))
    // })
    //
    //
    // e.target.reset()

    this.setState({currentUser: player})
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
      }).then(res => res.json()).then(player => this.setState({
        currentUser: player,
        favorites: player.favorites,
        loading: false
      }))
    } else {
      this.setState({loading: false})
    }
  }

  render() {
    return (

      <div id='app'>
        <Fragment>
          { this.state.loading ? null : this.renderNavbar() }
        </Fragment>
        <Fragment>
          {
            MAP_URLS.includes(this.props.location.pathname)
              || this.props.location.pathname.split('/')[1] === 'courts'
                ? this.renderMap() : null
          }
        </Fragment>

        <Switch>
          <Route exact path='/signup' render={() =>
            <Signup addPlayer={this.newPlayer} /> } />

          <Route exact path='/profile' render={() => this.state.loading ? null : this.showProfile()
          } />

          <Route exact path='/courts/:id' render={() => {
            return (
              <Fragment>
                <CourtDetail current={this.state.currentUser} court={this.state.currentCourt}
                fetchCourt={this.fetchCourt} />
              </Fragment>
            )
          }} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);


// handleMouseEnter = () => {
//   this.map.style = {cursor: 'pointer'}
// }

// onMapLoad = map => {
//     console.log(map);
// }
