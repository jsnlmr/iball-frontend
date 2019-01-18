import React, { Component, Fragment } from 'react'
import './App.css'
import Navbar from './Navbar'
import MapDisplay from './MapDisplay'
import CourtDetail from './CourtDetail'
import Signup from './Signup'
import PlayerProfile from './PlayerProfile'
import { Menu, Sidebar, Segment } from 'semantic-ui-react'
import { Route, withRouter, Switch } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'
const NAV_URLS = ['/', '/profile', '/courts/:id']
const MAP_URLS = ['/', '/courts/:id']


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      friends: [],
      favorites: [],
      courts: [],
      current_user: null,
    }
  }

  /////////// MAP & NAVBAR RENDER //////////
  renderNavbar = () => {
    return (
      <div id='nav'>
        <Navbar current={this.state.current_user} login={this.loginUser} logout={this.logoutUser}/>
      </div>
    )
  }

  renderMap = () => {
    return (
      <div id='map-display'>
        <MapDisplay showCourt={this.showCourt}
          courts={this.state.courts} />
      </div>
    )
  }

  //////////// COURT POPUP ////////////

  showCourt = e => {
    this.props.history.push('/')
    this.props.history.push(`/courts/${e.feature.properties.id + 1}`)
  }

  ////////////// PLAYER MANAGEMENT ////////////////

  loginUser = e => {
    e.preventDefault()
    e.persist()
    let username = e.target[0].value
    this.setState({
      current_user: this.state.players.find(p => {
        return p.username === username
      }, this.props.history.push(`${this.props.location.pathname}`))
    })

    e.target.reset()
    if(this.props.location.pathname === '/signup') {
      this.props.history.push('/')
    }
  }

  logoutUser = () => {
    this.setState({current_user: null},
      this.props.history.push('/')
    )
  }

  newPlayer = player => {
    let players = [...this.state.players, player]

    this.setState({
      players: players,
      current_user: player
    }, this.props.history.push('/'))
  }

  deletePlayer = player => {
    this.setState({
      players: this.state.players.filter(p => p.id !== player.id),
      current_user: null
    }, this.props.history.push('/'))
  }

  updatePlayer = player => {
    let players = this.state.players.filter(p => p.id !== player.id)

    this.setState({
      players: [...players, player],
      current_user: player
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
  }

  render() {
    return (

      <div id='app'>
        { this.renderNavbar() }
        {
          MAP_URLS.includes(this.props.location.pathname)
            || this.props.location.pathname.split('/')[1] === 'courts'
              ? this.renderMap() : null
        }

        <Switch>
          <Route exact path='/signup' render={() =>
            <Signup addPlayer={this.newPlayer} /> } />

          <Route exact path='/profile' render={() => {
            return (
              <Fragment>
                <PlayerProfile current={this.state.current_user}
                  delete={this.deletePlayer} update={this.updatePlayer} />
              </Fragment>
            )
          }} />

          <Route exact path='/courts/:id' render={() => {
            return (
              <Fragment>
                <CourtDetail current={this.state.current_user} />
              </Fragment>
            )
          }}/>
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
