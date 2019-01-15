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

  handleClick = (e) => {
    this.setState({selected: e.feature.properties})
  }

  handleMouseEnter = () => {
    Map.style = {cursor: 'pointer'}
  }

  closePopup = () => {
    console.log('close popup');
    this.setState({selected: null})
  }

  mapCourts = () => this.state.courts.map(court => {
    return (
      <Feature key={court.id} properties={court} coordinates={[court.lng, court.lat]}
        onClick={this.handleClick} />
    )
  })

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
        <Navbar current={this.state.current_user} login={this.loginUser} />
        <Map
          style='mapbox://styles/mapbox/light-v9'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[-77.032883, 38.898129]}
        >
          <Layer
            type="circle"

            paint={{
              'circle-color': 'red',
              'circle-stroke-width': 1,
            }}>
            { this.mapCourts() }
          </Layer>
          {
            this.state.selected ?
              <Sidebar.Pushable id='sidebar' animation='push' direction='left'
                visible vertical >
                <CourtDetail close={this.closePopup}
                  current={this.state.current_user}
                  details={this.state.selected} />
              </Sidebar.Pushable>
            :
              null
          }
        </Map>
      </div>
    );
  }
}

export default App;
