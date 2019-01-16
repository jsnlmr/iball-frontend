import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'
import './App.css'
import Navbar from './Navbar'
import CourtDetail from './CourtDetail'
import { Menu, Sidebar, Segment } from 'semantic-ui-react'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})

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

  //////////// COURT POPUP ////////////

  showCourt = (e) => {
    if(this.state.selected) {this.closeCourt()}
    this.setState({selected: e.feature.properties})
  }

  closeCourt = () => {
    this.setState({selected: null})
  }


  /////////// COURT MAPPING ////////////

  mapCourts = () => this.state.courts.map(court => {
    return (
      <Feature key={court.id} properties={court} coordinates={[court.lng, court.lat]}
        onClick={this.showCourt} />
    )
  })

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
      <div>
        <div id='nav'>
          <Navbar current={this.state.current_user} login={this.loginUser} logout={this.logoutUser}/>
        </div>

        <div id='map'>
          <Map
            ref={e => {this.map = e}}
            style='mapbox://styles/mapbox/light-v9'
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            center={[-77.032883, 38.898129]}
            onStyleLoad={this.onMapLoad}
          >
            <Layer
              type="circle"

              paint={{
                'circle-color': 'red',
                'circle-stroke-width': 1,
              }}>

              { this.mapCourts() }
            </Layer>

          </Map>
          <div>
          {
            this.state.selected ?
              <Sidebar id='sidebar' animation='push' direction='left'
                visible vertical >
                <CourtDetail close={this.closeCourt}
                  current={this.state.current_user}
                  details={this.state.selected} />
              </Sidebar>
            :
              null
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// handleMouseEnter = () => {
//   this.map.style = {cursor: 'pointer'}
// }

// onMapLoad = map => {
//     console.log(map);
// }
