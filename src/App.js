import React, { Component, Fragment } from 'react'
import './App.css'
import Navbar from './Navbar'
import MapDisplay from './MapDisplay'
import CourtDetail from './CourtDetail'
import Signup from './Signup'
import { Menu, Sidebar, Segment } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router-dom'

const API = 'http://localhost:3001/api/v1'


class App extends Component {
  constructor() {
    super()

    this.state = {
      players: [],
      friends: [],
      favorites: [],
      courts: [],
      selected: null,
      current_user: null,
      gps: null
    }
  }

  /////////// MAP & NAVBAR RENDER //////////
  renderMapNavbar = () => {
    return (
      <Fragment>
        <div id='nav'>
          <Navbar current={this.state.current_user} login={this.loginUser} logout={this.logoutUser}/>
        </div>
        <div id='map-display'>
          <MapDisplay showCourt={this.showCourt}
            courts={this.state.courts} gps={this.state.gps} />
        </div>
      </Fragment>
    )
  }

  //////////// COURT POPUP ////////////

  showCourt = (e => {
    console.log('loading court details')
    if(this.state.selected) { this.closeCourt() }

    this.setState({selected: e.feature.properties})

    this.props.history.push(`/courts/${this.state.selected.id + 1}`)
  })

  closeCourt = () => {
    this.setState({selected: null})
  }

  ////////////// LOGIN/LOGOUT ////////////////

  loginUser = e => {
    e.preventDefault()
    e.persist()
    let username = e.target[0].value
    this.setState({
      current_user: this.state.players.find(p => {
        return p.username === username
      })
    })

    e.target.reset()
  }

  logoutUser = () => {
    this.closeCourt()
    this.setState({current_user: null})
  }

  /////////// LIFECYCLE //////////////

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        gps: [position.coords.longitude, position.coords.latitude]
      })
    })

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

        <Route exact path='/' render={() => this.renderMapNavbar()} />

        <Route exact path='/signup' component={Signup} />

        <Route exact path='/courts/:id' render={() => {
          return (
            <div>
              {this.renderMapNavbar()}
            {
              this.state.selected ? <CourtDetail close={this.closeCourt}
                  current={this.state.current_user}
                    details={this.state.selected} />
              : null
            }
            </div>
          )
        }}/>


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
