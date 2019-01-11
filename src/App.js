import React, { Component } from 'react'
import ReactMapBoxGL, { Layer, Feature, Popup } from 'react-mapbox-gl'
import './App.css'
import Navbar from './Navbar'
import CourtDetail from './CourtDetail'

const Map = ReactMapBoxGL({
  accessToken: process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN,
})


class App extends Component {
  constructor() {
    super()

    this.state = {
      players: [],
      friends: [],
      favorites: [],
      courts: [],
      selected: null,
      current_user: null
    }
  }

  handleClick = (e) => {
    console.log(e.lngLat);
    this.setState({selected: true})
  }

  handleMouseEnter = () => {

  }

  render() {


    return (
      <div>
        <Navbar current={this.state.current_user} />
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
            <Feature
            coordinates={[-76.9954049, 38.8953954]}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            />
          </Layer>
          {
            this.state.selected ?
              <Popup coordinates={[-76.9954049, 38.8953954]}>
                <CourtDetail />
              </Popup>
            :
              null
          }
        </Map>
      </div>
    );
  }
}

export default App;

// layout={{ "icon-image": "marker-15" }}
//          id="courts"
